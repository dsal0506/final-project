// Import necessary modules
import { Router } from 'express';
import teamsRouter from './teams';  // Import the router for teams

// Create an instance of the Express Router
const router = Router();

// Use the teams router for the '/teams' path
router.use('/teams', teamsRouter);

// Export the router
export default router;
