export interface SSEEvent {
    id?: string;
    event?: string;
    data: string;
}

export interface SSEResponse {
    stream: ReadableStream<SSEEvent>;
}

export type SSEHandler = (req: Request, res: Response) => SSEResponse;