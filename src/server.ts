import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { registerIPAsset } from '../scripts/registration/register';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Story Protocol API Server' });
});

// IP Asset Registration endpoint
app.post('/register-ip', async (req: Request, res: Response) => {
    try {
        const result = await registerIPAsset();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});

// Start server
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    
    // Run IP asset registration when server starts
    try {
        console.log('Starting IP asset registration...');
        const result = await registerIPAsset();
        console.log('IP Asset Registration Result:', result);
    } catch (error) {
        console.error('Error during IP asset registration:', error);
    }
}); 