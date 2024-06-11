import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};

export const isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxx
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid Token' });
                }
                req.user = decode;
                next();
            }
        );
    } else {
        res.status(401).json({ message: 'No Token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({ message: 'Invalid Admin Token' });
    }
};
