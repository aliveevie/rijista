import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8083;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Story Protocol API Server' });
});

// IP Asset Registration endpoint
app.post('/api/register-ip', async (req: Request, res: Response) => {
    try {
        // Log the received data
        console.log('Received registration data:', req.body);

        // Send a mock success response
        res.json({
            success: true,
            data: {
                message: 'Registration data received successfully',
                receivedData: req.body
            }
        });

    } catch (error) {
        console.error('Error in registration endpoint:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 