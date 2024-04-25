import { openDB } from "../db.js"

export const getUsers = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_usuarios')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron usuarios'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_usuarios WHERE id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(404).json({
                message: 'No se encontro al usuario'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createUser = async (req, res) => {
    try {
        const { nombre, cedula, nickname, contrasena } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_usuarios (nombre, cedula, nickname, contrasena) VALUES (?, ?, ?, ?)', [nombre, cedula, nickname, contrasena])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Usuario creado correctamente'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo crear el usuario'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, cedula, nickname, contrasena } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_usuarios SET nombre = ?, cedula = ?, nickname = ?, contrasena = ? WHERE usuario_id = ?', [nombre, cedula, nickname, contrasena, id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Usuario actualizado correctamente'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar el usuario'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        // const [result] = await db.query('DELETE FROM tbl_usuarios WHERE usuario_id = ?', [id])
        const [result] = await db.query('UPDATE tbl_usuarios SET estado = 0 WHERE usuario_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Usuario eliminado correctamente'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo eliminar el usuario'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}