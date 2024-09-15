import { processLogFile, pageViewStatsMap } from './index';
import * as fs from 'fs';

// Mock the entire fs module, specifically the readFileSync function
jest.mock('fs', () => ({
    readFileSync: jest.fn(() => '/home 123.45.67.89\n/home 123.45.67.90\n/about 123.45.67.89\n/home 123.45.67.89'),
}));

// jest.mock('fs');
describe('Log Parser', () => {
    beforeEach(() => {
        pageViewStatsMap.clear();
    });

    test('should correctly parse total and unique visits for a simple log file', () => {
        // Run the log parser
        processLogFile('mock.log');

        // Validate the results
        expect(pageViewStatsMap.get('/home')?.totalVisits).toBe(3);
        expect(pageViewStatsMap.get('/home')?.uniqueVisitors.size).toBe(2);
        expect(pageViewStatsMap.get('/about')?.totalVisits).toBe(1);
        expect(pageViewStatsMap.get('/about')?.uniqueVisitors.size).toBe(1);
    });

    test('should handle an empty log file correctly', () => {
        // Mock fs.readFileSync to return an empty string
        (fs.readFileSync as jest.Mock).mockReturnValue('');

        processLogFile('mock.log');

        // Expect the map to be empty
        expect(pageViewStatsMap.size).toBe(0);
    });

    test('should handle logs with repeated IPs correctly', () => {
        const mockLogData = `/contact 111.22.33.44\n/contact 111.22.33.44\n/contact 111.22.33.44`;

        // Mock fs.readFileSync to return repeated IPs log data
        (fs.readFileSync as jest.Mock).mockReturnValue(mockLogData.trim());

        processLogFile('mock.log');

        // Expect 3 total visits and 1 unique IP
        expect(pageViewStatsMap.get('/contact')?.totalVisits).toBe(3);  // This should be 3 total visits
        expect(pageViewStatsMap.get('/contact')?.uniqueVisitors.size).toBe(1);  // This should be 1 unique IP
    });
});