import * as fs from 'fs';

// Interface to track page statistics
export interface PageViewStats {
    totalVisits: number;
    uniqueVisitors: Set<string>;
}

// Map to store statistics for each page
export const pageViewStatsMap: Map<string, PageViewStats> = new Map();

// Function to read and parse the log file
export const processLogFile = (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf-8'); // Load the file into memory

    const logEntries = data.split('\n'); // Split file content into log entries

    logEntries.forEach(logEntry => {
        if (logEntry.trim()) { // Ensure the log entry is not empty
            const [pageUrl, visitorIp] = logEntry.split(' ');
            if (pageUrl && visitorIp) {
                if (!pageViewStatsMap.has(pageUrl)) {
                    // Initialize a new page stats entry if not already present
                    pageViewStatsMap.set(pageUrl, { totalVisits: 0, uniqueVisitors: new Set<string>() });
                }

                const pageViewStats = pageViewStatsMap.get(pageUrl)!;
                pageViewStats.totalVisits += 1; // Increment total visits unconditionally
                pageViewStats.uniqueVisitors.add(visitorIp); // Add IP to the set of unique visitors
            }
        }
    });

    // Display results once file is processed
    displayResults();
};
// Function to print results: sorted by total visits and unique visitors
const displayResults = () => {
    // Sorting pages by total visits
    const pagesByTotalVisits = Array.from(pageViewStatsMap.entries()).sort(
        (a, b) => b[1].totalVisits - a[1].totalVisits
    );

    console.log('Pages by total visits:');
    pagesByTotalVisits.forEach(([pageUrl, stats]) => {
        console.log(`${pageUrl} ${stats.totalVisits} visits`);
    });

    // Sorting pages by unique visitors (number of unique IPs)
    const pagesByUniqueVisitors = Array.from(pageViewStatsMap.entries()).sort(
        (a, b) => b[1].uniqueVisitors.size - a[1].uniqueVisitors.size
    );

    console.log('\nPages by unique visitors:');
    pagesByUniqueVisitors.forEach(([pageUrl, stats]) => {
        console.log(`${pageUrl} ${stats.uniqueVisitors.size} unique views`);
    });
};

// Run the parsing function on the log file
const logFilePath = './web.log';
processLogFile(logFilePath);