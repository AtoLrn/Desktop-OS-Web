import { Application } from "../applications";

interface AppType<T extends Application> {
    new(...args: any[]): T
}