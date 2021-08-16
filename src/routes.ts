import { DockerController } from "./controller/DockerController";
import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},{
    method: "get",
    route: "/container",
    controller: DockerController,
    action: "all"
}, {
    method: "get",
    route: "/container/:id",
    controller: DockerController,
    action: "one"
}];