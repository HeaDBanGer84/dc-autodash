import * as express from "express";
import { DockerController } from "../controller/DockerController";


export default function create(controller:DockerController){

    const router= express.Router();;

    router.get("/",async(req,res)=>{
        return res.json(await controller.getAll());
    });


    router.get('/:id',async (req,res)=>{
        return res.json(await controller.getOne(req.params.id))
    })


    return router;

}