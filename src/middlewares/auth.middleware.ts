import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ success: false, message: 'Token não fornecido.' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		//@ts-ignore
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ success: false, message: 'Token inválido ou expirado.' });
	}
}
