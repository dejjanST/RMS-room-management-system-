import { Key, ResponseKeyList, ResponseKeyTypes } from './access-key/key';
import { AccessListData, ResponseAccessList, ResponseGroupList } from './access.model';

export const groupListMock: ResponseGroupList = {
  data: [
    { id: 1, name: 'Group 1', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 2, name: 'Group 2', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 3, name: 'Group 3', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 4, name: 'Group 4', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 5, name: 'Group 5', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 6, name: 'Group 6', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 7, name: 'Group 7', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 8, name: 'Reception', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 9, name: 'Security', type: 1, color: '#efefef', force: false, acl: [] },
    { id: 10, name: 'Cleaner Staff', type: 1, color: '#efefef', force: false, acl: [] },
  ]
};

export const groupMock: AccessListData = {
  id: 1,
  name: 'Group 1',
  type: 1,
  color: '#efefef',
  force: false,
  acl: []
};

export const groupAccessMock1: ResponseAccessList = {
  data: {
    id: 1,
    name: 'Group 1',
    type: 1,
    color: '#eeeeee',
    force: false,
    groups: [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }],
    acl: []
  }
};


export const key: Key = {
  data: {
    id: 2,
    description: 'Key2 desc',
    key_no: '221133',
    key_type: 4,
    valid_from: 123123123,
    valid_to: 1705155754,
    acl: []
  }
};

export const keyListMock: ResponseKeyList = {
  data: [
    {
      id: 1,
      description: 'Key1 desc',
      key_no: '222222',
      key_type: 1,
      valid_from: 123123123,
      valid_to: 1705155754,
      acl: []

    },
    {
      id: 2,
      description: 'Key2 desc',
      key_no: '222222',
      key_type: 4,
      valid_from: 123123123,
      valid_to: 1705155754,
      acl: []
    },
    {
      id: 3,
      description: 'Key3 desc',
      key_no: '222222',
      key_type: 3,
      valid_from: 123123123,
      valid_to: 1705155754,
      acl: []
    },
    {
      id: 4,
      description: 'Key4 desc',
      key_no: '222222',
      key_type: 4,
      valid_from: 123123123,
      valid_to: 1705155754,
      acl: []
    },
  ]
};

export const keyTypesList: ResponseKeyTypes = {
  data: [
    {
      id: 1,
      type: 'Front Desc'
    },
    {
      id: 2,
      type: 'Cleaning staff'
    },
    {
      id: 3,
      type: 'Maintenance'
    },
    {
      id: 4,
      type: 'Security'
    },
    {
      id: 5,
      type: 'Management'
    }
  ]
};

