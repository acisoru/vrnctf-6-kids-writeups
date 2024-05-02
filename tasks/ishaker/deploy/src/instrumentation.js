import {preInit} from "@/lib/db";

export async function register(){
    await preInit()
}