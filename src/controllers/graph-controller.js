import { sendSuccessResponse, sendErrorResponse } from '../utils/response-handler.js';
import * as graphService from '../services/graph-service.js';

export const getGraphData = async (request, response) => {
    try {
        const d3Data = await graphService.fetchAndFormatGraph();
        return sendSuccessResponse(response, d3Data);
    } catch (error) {
        return sendErrorResponse(response, error);
    }
}