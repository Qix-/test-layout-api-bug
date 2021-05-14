#!/usr/bin/env node

import fs, { promises as fsp } from 'fs';
import http from 'http';
import { URL } from 'url';

const handler = async (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
	if (pathname === '/index.html') {
		const page = await fsp.readFile('./index.html', 'utf-8');
		const payload = await fsp.readFile('./payload.wasm');
		console.log('payload size is', payload.length);
		res.writeHead(200);
		res.end(page.replace('{{ASM64}}', payload.toString('base64')));
	} else {
		res.writeHead(404);
		res.end('not found\n');
	}
};

const server = http.createServer(handler);
const PORT = 3333;
server.listen(PORT, () => console.log('listening on port', PORT));
