export interface Iproduct {
    pname: string;
    pid: string;
    pstatus: Ipstatus;
    canReturn : 1 | 0;
}

export type Ipstatus = "In_Progress" | "Delivered" | "Dispatched"