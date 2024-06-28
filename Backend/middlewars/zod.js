const z = require("zod")

const UserSchemasingup = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

const UserSchemalogin = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

async function zodsignup(req, res, next) {
    try {
        const validatedData = UserSchemasingup.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: validatedData.error.issues[0].message
            })}
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}

async function zodlogin(req, res, next) {
    try {
        const validatedData = UserSchemalogin.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: validatedData.error.issues[0].message
            })}
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}


module.exports = {
    zodsignup,
    zodlogin
}