import type { Request, Response } from 'express';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response-handler.js';
import * as graphService from '../services/graph-service.js';

export const getGraphData = async (_: Request, response: Response) => {
    try {
        const d3Data = await graphService.fetchAndFormatGraph();
        return sendSuccessResponse(response, d3Data);
    } catch (error) {
        if (error instanceof Error) return sendErrorResponse(response, error);
        return sendErrorResponse(response, new Error('An unknown error occurred'));
    }
}