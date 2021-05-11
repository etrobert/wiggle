// This code was adapted from:
// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

export function makeSmooth(points) {
	return points.map((point, i) => {
		if (i === 0) {
			return `M ${point.x},${point.y}`;
		} else {
			const cp1 = controlPoint(points[i-1], points[i-2], point);
			const cp2 = controlPoint(point, points[i-1], points[i+1], true);
			return `C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${point.x},${point.y}`;
		}
	}).join(' ');
}

function controlPoint(current, previous, next, reverse) {
	const o = line(previous || current, next || current);
	const angle = o.angle + (reverse ? Math.PI : 0);
	const smoothedLength = o.length * .2;
	return {
		x: current.x + Math.cos(angle) * smoothedLength,
		y: current.y + Math.sin(angle) * smoothedLength,
	}
}

function line(pointA, pointB) {
	const lengthX = pointB.x - pointA.x;
	const lengthY = pointB.y - pointA.y;
	return {
		length: Math.sqrt(lengthX*lengthX + lengthY*lengthY),
		angle: Math.atan2(lengthY, lengthX),
	}
}
