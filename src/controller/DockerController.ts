import { PrismaClient } from ".prisma/client";

const Docker = require('dockerode');

export class DockerController {

    private _docker;
    private _prisma: PrismaClient;

    public get prisma(): PrismaClient {
        return this._prisma;
    }

    constructor(prisma: PrismaClient) {
        this._prisma = prisma;
        this._docker = new Docker({ socketPath: '/var/run/docker.sock' });
    }



    public async update() {
        updateDockerContainer(this._docker, this._prisma)();
    }

    /**
     * getAll
     */
    public async getAll() {
        return await this._prisma.dockerContainer.findMany()
    }

    /**
     * getOne
     */
    public async getOne(id: string) {
        return await this._prisma.dockerContainer.findUnique({
            where: {
                "id": id,
            },
        })
    }

}

function updateDockerContainer(docker: any, prisma: PrismaClient) {

    return function () {
        console.log('updateting container from Docker');
        docker.listContainers((err: any, containers: any[]) => {
            let resp = []
            console.log("delete all containers");
            prisma.dockerContainer.deleteMany({})
                .then(() => {
                    console.log("done")


                    if (containers) {
                        containers.forEach(async (containerInfo) => {
                            let dashEnabled = new String(containerInfo.Labels["dash.enabled"]).toLowerCase();
                            let composeService = containerInfo.Labels['com.docker.compose.service'];
                            console.log("Analysing: " + composeService + ': ' + dashEnabled);
                            if (dashEnabled !== 'false') {

                                let extractedURL = containerInfo.Labels['traefik.http.routers.' + composeService + '.rule'];
                                let dashUrl = containerInfo.Labels['dash.url'] ? containerInfo.Labels['dash.url'] : '';
                                let group = containerInfo.Labels['com.docker.compose.project'] ? containerInfo.Labels['com.docker.compose.project'] : undefined;

                                let name = containerInfo.Labels['dash.name'] ? containerInfo.Labels['dash.name'] : composeService;
                                let icon = containerInfo.Labels['dash.icon.mi'] ? containerInfo.Labels['dash.icon.mi'] : "public";
                                let color = containerInfo.Labels['dash.icon.color'] ? containerInfo.Labels['dash.icon.color'] : "#111111";

                                let url = '';
                                if (dashUrl != '') {
                                    url = dashUrl;
                                } else {
                                    const regex = /^Host\(\`(.*)\`\)/gm;
                                    let match = regex.exec(extractedURL)
                                    if (match) {
                                        url = "http://" + match[1]
                                    }
                                }

                                if (url != '') {
                                    let dbEntity = await prisma.dockerContainer.create({
                                        data: {
                                            id: containerInfo.Id,
                                            name: name,
                                            exposedUrl: url,
                                            icon: icon,
                                            color: color,
                                        }
                                    })
                                    console.log(dbEntity.name + " saved");
                                }
                            }
                        });
                    }
                });
        });
        console.log('running again in 10 seconds');
        setTimeout(updateDockerContainer(docker, prisma), 60000);
    }
}