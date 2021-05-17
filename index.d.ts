/// <reference types="node" />

import { FastifyPluginCallback } from 'fastify';
export interface FastifyMsgpackOptions { }
declare const fastifyMsgpack: FastifyPluginCallback<FastifyMsgpackOptions>;
export default fastifyMsgpack;