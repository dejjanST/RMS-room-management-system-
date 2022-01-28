import { ACLList } from '../../access-list.model';

export const ACLListMock1: ACLList = {
    list: [
        {
            manual: false,
            building: { id: 1, name: 'Left Wing' },
            floor: { id: 1, name: '1' },
            unit: { id: 1, name: 'room 101' },
            exclude: false,
            md5: '066cb4eafb3f0d19534d42f4d1f2850c',
            groups: [{ id: 9, name: 'Group 1', type: 1, color: '#4082e2', force: false }]
        },
        {
            manual: false,
            building: { id: 1, name: 'Left Wing' },
            floor: { id: 1, name: '1' },
            unit: { id: 2, name: 'room 102' },
            exclude: false,
            md5: '067d8754181324104363613871ca5d6f',
            groups: [{ id: 9, name: 'Group 1', type: 1, color: '#4082e2', force: false }]
        },
        {
            manual: false,
            building: { id: 1, name: 'Left Wing' },
            floor: { id: 2, name: '2' },
            unit: { id: null, name: 'All' },
            exclude: false,
            md5: 'c7fd4de9bf8c452458be1fdb78d1e864',
            groups: [{ id: 9, name: 'Group 1', type: 1, color: '#4082e2', force: false }]
        },
        {
            manual: false,
            building: { id: 1, name: 'Left Wing' },
            floor: { id: 2, name: '2' },
            unit: { id: 3, name: 'room 201' },
            exclude: true,
            md5: '55a8d458c8506757a227e7105878f8ec',
            groups: [{ id: 9, name: 'Group 1', type: 1, color: '#4082e2', force: false }]
        },
        {
            manual: false,
            building: { id: 2, name: 'Right Wing' },
            floor: { id: null, name: 'All' },
            unit: { id: null, name: 'All' },
            exclude: false,
            md5: '23ef36fdcee59781266b76b649e55909',
            groups: [{ id: 10, name: 'Group 2', type: 1, color: '#93e258', force: false }]
        }]
};

export const ACLListMock2 = {
    list: [
        {
            manual: true, building:
                { id: 1, name: 'Left Wing' },
            floor: { id: 1, name: '1' },
            unit: { id: 1, name: 'room 101' },
            exclude: false, md5: '38bdc135523e435e69cdc1fe6a6cdeae'
        },
        {
            manual: true, building: { id: 1, name: 'Left Wing' },
            floor: { id: 2, name: '2' }, unit: { id: null, name: 'All' },
            exclude: false, md5: 'd12886606e5313f6070303e5db13d076'
        },
        {
            manual: true, building: { id: 1, name: 'Left Wing' },
            floor: { id: 2, name: '2' }, unit: { id: 3, name: 'room 201' },
            exclude: true, md5: 'd0880d6bc51db82ff0ffd0ce4f97c0a1'
        }]
};


export const AccessListMock = {
    items: [
        {
            building: {
                id: 12,
                name: 'Building 1'
            },
            floor: {
                id: 123,
                name: 'Ground Floor'
            },
            exception: false
        },
        {
            building: {
                id: 12,
                name: 'Building 1'
            },
            floor: {
                id: 125,
                name: 'First Floor'
            },
            unit: {
                id: 124,
                name: 'Room 101'
            },
            exception: false
        },
    ]
};

// export const AccessListMock:AccessList = new AccessList();

// let item = new ACLItem();
// item.building.id = 12;
// item.building.name = 'Building 1';
// item.floor.id = 123;
// item.floor.name = 'Ground Floor';

// AccessListMock.items.push(item);

// item.building.id = 12;
// item.building.name = 'Building 1';
// item.floor.id = 124;
// item.floor.name = 'First Floor';
// item.unit.id = 1;
// item.unit.name = 'Room 101';

// AccessListMock.items.push(item);

// item.building.id = 12;
// item.building.name = 'Building 1';
// item.floor.id = 124;
// item.floor.name = 'First Floor';
// item.unit.id = 2;
// item.unit.name = 'Room 102';

// AccessListMock.items.push(item);

