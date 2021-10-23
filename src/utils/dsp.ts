export function processLoudness(louds: Uint8Array | null, points: number) {
    if (louds && louds.length > 20) {
        const [width, height] = [points, 1];
        const scale = louds.length / width;
        const scaleY = height / 256 * (256 / Math.log(256));
        
        const peakAvgs: number[] = [];
        for (let i = 0; i < width; i += 1) {
            const begin = Math.floor(i * scale);
            const end = Math.floor(i * scale + scale);
            let sum = 0;
            for (let i = begin; i < end; i++) {
                sum += louds[i];
            }
            peakAvgs.push(sum / scale);
        }

        // scale after log()
        const tmp = [...peakAvgs].filter(x => x > 0).sort((a, b) => a - b);
        const low = Math.log(tmp[Math.floor(tmp.length * 0.01)]) * scaleY;
        const high = Math.log(tmp[Math.floor(tmp.length * 0.99)]) * scaleY;
        const scaleY2 = height * (0.95 - 0.2) / (high - low);
        const offsetY2 = (height * 0.2) - (low * scaleY2);

        const result = [];
        for (let i = 0; i < width; i++) {
            let y = peakAvgs[i];
            if (y <= 0) y = 0;
            else {
                y = Math.log(y);
                y = y * scaleY;
                y *= scaleY2;
                y += offsetY2;
            }
            result.push(y);
        }
        return result;
    } else {
        return null;
    }
}