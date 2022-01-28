export interface ResponseFileUpload {
    data: FileUploadData;
    msg: string;
}

interface FileUploadData {
    file_name: string;
    file_path: string;
    id: number;
}
