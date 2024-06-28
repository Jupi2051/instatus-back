import { NextFunction, Request, Response } from "express";

const ValidSecretKeys = [
    '9972fd2f8f5a96432d7bc43a9f9dd798e009e3dbc9a7dc9a66b8f1dfa925f3e6',
    '4fa452b259f6f22ceb07962e3f4d0f5a203984e80079feb1378a25f38b9d9e88',
    '9db666fcadb608384c165a104b87fe8e13095ec6b21a1a21053168678ef0268f',
    '03519efefedffea5cbb2e3534cbf26ad840e66817e849a1c797e46cc6e79c230',
    '05290d3adf805f86bb3a5c3c16494d9ea4603b4f2910652a000dcd771a23dc01'
];


export default function SecretKeyRequest() : (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
        // you'd usually wanna check for an actual valid secret key in the database or cache or whatever method you're using.
        const authHeader = req.header("Authorization");
        if (authHeader) {
            const splitHeader = authHeader.split(" ");
            if (splitHeader.length > 1) {
                if (ValidSecretKeys.includes(splitHeader[1])) {
                    next();
                }
            }
        }
        res.status(401).send({
            message: "Authorization is required for this."
        })
    }
}