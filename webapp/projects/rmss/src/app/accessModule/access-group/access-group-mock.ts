import { ResponseAccessList } from '../access.model';

export const GroupAccessListMock: ResponseAccessList = {
    data: {
        id: 3, name: 'grupa 1', type: 1,
        buildings: [{ id: 1, name: 'Left Wing', child_count: 5 }],
        floors: [{ id: 4, name: '4', building_id: 1, child_count: 2 },
        { id: 5, name: '5', building_id: 1, child_count: 2 }], units: [{ id: 1, name: 'room 101', floor_id: 1 }]
    }
};
