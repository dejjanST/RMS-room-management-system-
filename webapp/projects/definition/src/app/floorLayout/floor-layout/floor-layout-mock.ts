export const listUnitTypesMock = {
    data: [
        {
            id: 1, name: 'Unit Type 1', rooms: 1, description: null,
            master_controller_model: 'RC', locked: false, updated: 1593081260, deleted: false
        },
        {
            id: 2, name: 'Unit Type 2', rooms: 2, description: null,
            master_controller_model: 'RC', locked: false, updated: 1593081260, deleted: false
        },
        {
            id: 3, name: 'Unit Type 3', rooms: 3, description: null,
            master_controller_model: 'CC', locked: true, updated: 1593081260, deleted: false
        },
        {
            id: 4, name: 'Unit Type 4', rooms: 1, description: null,
            master_controller_model: 'CC', locked: false, updated: 1593081260, deleted: false
        },
        {
            id: 5, name: 'Unit Type 5', rooms: 2, description: null,
            master_controller_model: 'AC', locked: false, updated: 1593081260, deleted: false
        },
        {
            id: 6, name: 'Unit Type 6', rooms: 3, description: null,
            master_controller_model: 'AC', locked: true, updated: 1593081260, deleted: false
        }
    ]
};

export const imageUploadMock = {
    headers: { normalizedNames: {}, lazyUpdate: null },
    status: 201,
    statusText: 'Created',
    url: 'http://localhost/api/file/upload/', ok: true, type: 4, body: {
        msg: 'The file has been created successfully',
        data: { id: 1, file_path: 'rms_server/files/1593413269_fulhade.jpg', file_name: 'fulhade.jpg' }
    }
};

export const editFloorLayoutMock = {
    data:
    {
        id: 1,
        name: 'Ground Floor',
        file_id: 1,
        site_id: 1,
        updated: null,
        deleted: false,
        units: [{ id: 2, unit_type: 2, unit_no: 1, pos: { x: 123, y: 321 } }]
    }
};
