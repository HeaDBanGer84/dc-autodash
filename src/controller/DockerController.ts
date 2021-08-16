import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { DockerContainer } from "../entity/DockerContainer";

const Docker = require('dockerode');
const Container = require('dockerode/lib/container');

export class DockerController {

    private docker = new Docker({ socketPath: '/var/run/docker.sock' })
    private containerRepository = getRepository(DockerContainer)


    async import() {
        this.docker.listContainers(async function (err, containers) {
            let resp = []
            if (containers) {
                let containerRepository = getRepository(DockerContainer)
                containers.forEach( async (containerInfo) => {
                    let dashEnabled = new String(containerInfo.Labels["dash.enabled"]).toLowerCase();
                    let composeService = containerInfo.Labels['com.docker.compose.service'];
                    console.log(composeService + ': ' + dashEnabled);
                    if (dashEnabled !== 'false') {

                        let extractedURL = containerInfo.Labels['traefik.http.routers.' + composeService + '.rule'];
                        let dashUrl = containerInfo.Labels['dash.url'] ? containerInfo.Labels['dash.url'] : '';
                        let group = containerInfo.Labels['com.docker.compose.project'] ? containerInfo.Labels['com.docker.compose.project'] : undefined;

                        let name = containerInfo.Labels['dash.name'] ? containerInfo.Labels['dash.name'] : composeService;
                        let icon = containerInfo.Labels['dash.icon.fa'] ? containerInfo.Labels['dash.icon.fa'] : "fas fa-globe";
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
                            // insert new users for test
                            let model = containerRepository.create()
                            model.id = containerInfo.Id;
                            model.name = name;
                            model.exposedUrl = url;
                            model.icon = icon;
                            model.color = color;
                            containerRepository.save(model)
                        }
                    }
                });
            }
        });
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.containerRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.containerRepository.findOne(request.params.id);
    }

}