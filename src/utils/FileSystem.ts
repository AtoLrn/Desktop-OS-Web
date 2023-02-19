import { shortNumberId } from "./idGenerator"

export interface BaseInode {
    id: number,
    name: string,
    
} 


export interface File extends BaseInode {
    content: string
}

export interface Directory extends BaseInode {
    content: number[]
}

type Inode = File | Directory

export const isInode = (inode: any): inode is Inode => {
    if (!inode) return false

    if (typeof inode.id !== 'number') return false
    if (typeof inode.name !== 'string') return false
    return true
}

export const isDirectory = (inode: any): inode is Directory => {
    if (!inode) return false

    if (typeof inode.content === 'string') return false
    return true
}

export const isFile = (inode: any): inode is File => {
    if (!inode) return false

    if (typeof inode.content !== 'string') return false
    return true
}

export class FileSystem {
    inodes: Map<number, Directory | File> = new Map()
    constructor() {
        this.inodes.set(0, {
            id: 0,
            name: 'root',
            content: []
        })
        const jsonFileSystem = localStorage.getItem('fileSystem') 
        if (!jsonFileSystem) return
        // this.inodes = JSON.parse(jsonFileSystem)     
        

    }

    _getInode(id: number): Inode | undefined {
        return this.inodes.get(id)
    }

    _saveInode(id: number, inode: Inode) {
        return this.inodes.set(id, inode)
    }

    save(name: string, content: string, parentId = 0): File | false 
        {
        const parent = this._getInode(parentId)
        if (!isDirectory(parent)) return false

        const id = shortNumberId()
        const file = {
            id,
            name,
            content
        }

        parent.content.push(id)
        this._saveInode(id, file)
        return file
    }

    getDirectory(id: number): Inode[] {
        const directory = this._getInode(id)
        if (!isDirectory(directory)) return []
        return directory.content.map(id => this._getInode(id)).filter(isInode)
    } 
}

export const fileSystem = new FileSystem()