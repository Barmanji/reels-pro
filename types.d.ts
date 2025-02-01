import { Connection } from "mongoose"
declare global {
    // Use var!
    var mongoose: {
        conn: Connection | "" // why single pipe?
        promise: Promise<Connection> | null //<> these use for datatype
    }
}

export {};
