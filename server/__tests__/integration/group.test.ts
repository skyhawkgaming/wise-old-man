import supertest from 'supertest';
import api from '../../src/api';
import { Player } from '../../src/database/models';
import { TestData } from '../types';
import { resetDatabase } from '../utils';

const request = supertest(api);

const BASE_URL = '/api/groups';

const TEST_DATA: TestData = {};

beforeAll(async done => {
  await resetDatabase();

  await Player.create({ id: 1000000, username: 'test player', displayName: 'Test Player' });
  await Player.create({ id: 200000, username: 'alt player', displayName: 'Alt Player' });

  done();
});

describe('Group API', () => {
  describe('1. Creating', () => {
    test("1.1 - DON'T create (invalid group name)", async done => {
      const response = await request.post(BASE_URL).send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch("Parameter 'name' is undefined.");

      done();
    });

    test("1.2 - DON'T create (empty group name)", async done => {
      const body = { name: '' };
      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch("Parameter 'name' is undefined.");

      done();
    });

    test("1.3 - DON'T create (invalid member roles)", async done => {
      const body = {
        name: 'A new test group',
        members: [
          { username: 'test player', role: 1 },
          { username: 'ALT PLAYER', role: 'random' },
          { username: 'zezima' }
        ]
      };

      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(
        'Invalid member roles. Please check the roles of the given members.'
      );
      expect(response.body.data).toEqual([
        { username: 'test player', role: 1 },
        { username: 'ALT PLAYER', role: 'random' }
      ]);

      done();
    });

    test('1.4 - Create valid group (no members)', async done => {
      const body = { name: ' Some Group_', description: 'Test', clanChat: ' Test ', homeworld: 492 };
      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(201);
      expect(response.body.name).toMatch('Some Group');
      expect(response.body.clanChat).toMatch('Test');
      expect(response.body.description).toMatch('Test');
      expect(response.body.homeworld).toBe(492);

      TEST_DATA.noMembers = response.body;

      done();
    });

    test('1.5 - Create valid group (default roles members)', async done => {
      const body = {
        name: 'Cool Bois',
        members: [
          { username: '  test_player' },
          { username: '  ALT PLAYER' },
          { username: 'New Username' },
          { username: 'alt player   ' },
          { username: '__ zezima ' },
          { username: 'Jakesterwars' }
        ]
      };

      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(201);
      expect(response.body.members.length).toBe(5);
      expect(response.body.members[0].displayName).toContain('Test Player');
      expect(response.body.members[1].username).toBe('alt player');
      expect(response.body.members[2].username).toBe('new username');
      expect(response.body.members[3].username).toBe('zezima');
      expect(response.body.members[4].displayName).toBe('Jakesterwars');
      expect(response.body.members.filter(m => m.role !== 'member').length).toBe(0);

      TEST_DATA.membersNoLeaders = response.body;

      done();
    }, 10000);

    test('1.6 - Create valid group (members, w/ roles)', async done => {
      const body = {
        name: 'Cooler Bois',
        members: [
          { username: 'TEST player', role: 'leader' },
          { username: ' alt PLAYER ', role: 'captain' },
          { username: 'zezima' }
        ]
      };

      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(201);
      expect(response.body.members.length).toBe(3);
      expect(response.body.members.map(m => m.username)).toContain('alt player');
      expect(response.body.members.map(m => m.displayName)).toContain('Test Player');
      expect(response.body.members.filter(m => m.role === 'leader').length).toBe(1);
      expect(response.body.members.filter(m => m.role === 'captain').length).toBe(1);
      expect(response.body.members.filter(m => m.role === 'member').length).toBe(1);

      TEST_DATA.membersOneLeader = response.body;

      done();
    }, 10000);

    test("1.7 - DON'T create (name already taken)", async done => {
      const body = { name: 'Some Group' };
      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('is already taken');

      done();
    });

    test("1.8 - DON'T create (invalid members list format)", async done => {
      const body = { name: 'RSPT', members: ['One', 'Two'] };
      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('Invalid members list');

      done();
    });

    test("1.9 - DON'T create (invalid member in list)", async done => {
      const body = {
        name: 'RSPT',
        members: [
          { username: 'Test Player' },
          { username: 'Alt Player' },
          { username: 'Some really long username' }
        ]
      };

      const response = await request.post(BASE_URL).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('Found 1 invalid usernames');
      expect(response.body.data).toContain('Some really long username');

      done();
    });

    test("1.10 - DON'T create (invalid homeworld type)", async done => {
      const body = {
        name: ' Some Group_',
        description: 'Test',
        clanChat: ' Test ',
        homeworld: 'BadType'
      };
      const response = await request.post(BASE_URL).send(body);

      expect(response.body.message).toMatch("Parameter 'homeworld' is not a valid number.");

      done();
    });
  });

  describe('2. Editing', () => {
    test("2.1 - DON'T edit (invalid verification code)", async done => {
      const response = await request.put(`${BASE_URL}/1000`).send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch("Parameter 'verificationCode' is undefined.");

      done();
    });

    test("2.2 - DON'T edit (empty params)", async done => {
      const body = { verificationCode: 'XYZ' };
      const response = await request.put(`${BASE_URL}/1000000`).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('Nothing to update.');

      done();
    });

    test("2.3 - DON'T edit (group id does not exist)", async done => {
      const body = { name: 'RSPT', verificationCode: 'XYZ' };
      const response = await request.put(`${BASE_URL}/1000000`).send(body);

      expect(response.status).toBe(404);
      expect(response.body.message).toMatch('Group not found');

      done();
    });

    test("2.4 - DON'T edit (group name is taken)", async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = { name: 'Cool Bois', verificationCode: TEST_DATA.noMembers.verificationCode };

      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('is already taken');

      done();
    });

    test("2.5 - DON'T edit (incorrect code)", async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = { verificationCode: 'XYZ', members: [{ username: 'Psikoi', role: 'leader' }] };

      const response = await request.put(url).send(body);

      expect(response.status).toBe(403);
      expect(response.body.message).toMatch('Incorrect verification code');

      done();
    });

    test("2.6 - DON'T edit (invalid member in list)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [{ username: 'Psikoi', role: 'leader' }, { username: 'Really long username' }]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('Found 1 invalid usernames');
      expect(response.body.data).toContain('Really long username');

      done();
    });

    test("2.7 - DON'T edit (invalid role in members list)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [{ username: 'Psikoi', role: 'INVALID' }, { username: 'Zezima' }]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('Invalid member roles.');
      expect(response.body.data).toEqual([{ username: 'Psikoi', role: 'INVALID' }]);

      done();
    });

    test('2.8 - Edit (members list)', async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [
          { username: 'Psikoi', role: 'achiever' },
          { username: 'zezIMA', role: 'firemaker' },
          { username: 'Zulu' }
        ]
      };

      const response = await request.put(url).send(body);

      expect(response.status).toBe(200);
      expect(response.body.members.map(m => m.username)).toContain('psikoi');
      expect(response.body.members.map(m => m.username)).toContain('zezima');
      expect(response.body.members.filter(m => m.role === 'achiever').length).toBe(1);
      expect(response.body.members.filter(m => m.role === 'firemaker').length).toBe(1);
      expect(response.body.members.filter(m => m.role === 'member').length).toBe(1);

      done();
    });

    test('2.9 - Edit (name)', async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = { name: 'WISE OLD MAN', verificationCode: TEST_DATA.noMembers.verificationCode };

      const response = await request.put(url).send(body);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('WISE OLD MAN');

      done();
    });

    test('2.10 - Edit (clan chat)', async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = { clanChat: 'TheBois ', verificationCode: TEST_DATA.noMembers.verificationCode };

      const response = await request.put(url).send(body);

      expect(response.status).toBe(200);
      expect(response.body.clanChat).toBe('TheBois');

      done();
    });
  });

  describe('3. Listing', () => {
    test('3.1 - List groups', async done => {
      const response = await request.get(BASE_URL).send();

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);

      done();
    });

    test('3.2 - Search groups (pagination limit)', async done => {
      const response = await request.get(`/api/groups`).query({ limit: 1 });

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);

      done();
    });
  });

  describe('4. Adding members', () => {
    test("4.1 - DON'T add members (id does not exist)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [{ username: 'elvard', role: 'leader' }]
      };

      const url = `${BASE_URL}/1294385/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Group not found.');

      done();
    });

    test("4.2 - DON'T add members (incorrect verification code)", async done => {
      const body = {
        verificationCode: 'xxx-xxx-xxx',
        members: [{ username: 'elvard', role: 'leader' }]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Incorrect verification code.');

      done();
    });

    test("4.3 - DON'T add members (empty members list)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: []
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid or empty members list.');

      done();
    });

    test("4.4 - DON'T add members (invalid list)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: ['elvard@invalid']
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid members list. Each member must have a "username".');

      done();
    });

    test("4.5 - DON'T add members (invalid username)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [{ username: 'elvard@invalid', role: 'member' }]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch("At least one of the member's usernames");

      done();
    });

    test("4.6 - DON'T add members (invalid role)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [{ username: 'elvard', role: 'INVALID' }]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('INVALID is not a valid role');

      done();
    });

    test("4.7 - DON'T add members (already member)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [{ username: 'zezima', role: 'member' }]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('All players given are already members.');

      done();
    });

    test('4.8 - Add members', async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: [
          { username: 'elvard', role: 'ranger' },
          { username: 'sethmare', role: 'magician' },
          { username: 'rro' }
        ]
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/add-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(200);
      expect(response.body.members.map(m => m.username)).toContain('elvard');
      expect(response.body.members.filter(m => m.role === 'ranger').length).toBe(1);
      expect(response.body.members.filter(m => m.role === 'magician').length).toBe(1);
      expect(response.body.members.filter(m => m.role === 'member').length).toBeGreaterThanOrEqual(1);

      done();
    });
  });

  describe('5. Changing role', () => {
    test("5.1 - DON'T change role (group id does not exist)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        username: 'elvard',
        role: 'ranger'
      };

      const url = `${BASE_URL}/1294385/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Group not found.');

      done();
    });

    test("5.2 - DON'T change role (incorrect verification code)", async done => {
      const body = {
        verificationCode: 'xxx-xxx-xxx',
        username: 'elvard',
        role: 'ranger'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Incorrect verification code.');

      done();
    });

    test("5.3 - DON'T change role (empty username)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        role: 'ranger'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Parameter 'username' is undefined.");

      done();
    });

    test("5.4 - DON'T change role (empty role)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        username: 'Psikoi'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Parameter 'role' is undefined.");

      done();
    });

    test("5.5 - DON'T change role (invalid role)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        username: 'Psikoi',
        role: 'INVALID'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('INVALID is not a valid role.');

      done();
    });

    test("5.4 - DON'T change role (not a member)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        username: 'REALLY_LONG_USERNAME',
        role: 'ranger'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch('REALLY_LONG_USERNAME is not a member');

      done();
    });

    test("5.5 - DON'T change role (already has role)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        username: 'sethmare',
        role: 'magician'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('sethmare is already a magician.');

      done();
    });

    test('5.6 - Change role', async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        username: 'sethmare',
        role: 'brawler'
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/change-role`;
      const response = await request.put(url).send(body);

      expect(response.status).toBe(200);
      expect(response.body.role).toBe('brawler');

      done();
    });
  });

  describe('6. Removing members', () => {
    test("6.1 - DON'T remove members (group id does not exist)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: ['elvard']
      };

      const url = `${BASE_URL}/1294385/remove-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Group not found.');

      done();
    });

    test("6.2 - DON'T remove members (incorrect verification code)", async done => {
      const body = {
        verificationCode: 'xxx-xxx-xxx',
        members: ['elvard']
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/remove-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Incorrect verification code.');

      done();
    });

    test("6.3 - DON'T remove members (empty members list)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: []
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/remove-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid or empty members list.');

      done();
    });

    test("6.4 - DON'T remove members (not a member)", async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: ['randomName']
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/remove-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('No valid tracked players were given.');

      done();
    });

    test('6.5 - Remove members', async done => {
      const body = {
        verificationCode: TEST_DATA.noMembers.verificationCode,
        members: ['elvard']
      };

      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}/remove-members`;
      const response = await request.post(url).send(body);

      expect(response.status).toBe(200);

      done();
    });
  });

  describe('7. Deleting', () => {
    test("7.1 - DON'T delete (id does not exist)", async done => {
      const url = `${BASE_URL}/1294385`;
      const body = { verificationCode: TEST_DATA.noMembers.verificationCode };

      const response = await request.delete(url).send(body);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Group not found.');

      done();
    });

    test("7.2 - DON'T delete (incorrect verification code)", async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = { verificationCode: 'xxx-xxx-xxx' };

      const response = await request.delete(url).send(body);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Incorrect verification code.');

      done();
    });

    test('7.3 - Delete group', async done => {
      const url = `${BASE_URL}/${TEST_DATA.noMembers.id}`;
      const body = { verificationCode: TEST_DATA.noMembers.verificationCode };

      const response = await request.delete(url).send(body);

      expect(response.status).toBe(200);
      expect(response.body.message).toMatch('Successfully deleted group');

      done();
    });
  });

  describe('8. Viewing', () => {
    test("8.1 - DON'T view non-existing id", async done => {
      const response = await request.get(`${BASE_URL}/9999`);

      expect(response.status).toBe(404);
      expect(response.body.message).toMatch('Group not found.');

      done();
    });

    test('8.1 - View valid group', async done => {
      const response = await request.get(`${BASE_URL}/${TEST_DATA.membersNoLeaders.id}`).send();

      expect(response.status).toBe(200);
      expect(response.body.name).toMatch(TEST_DATA.membersNoLeaders.name);
      expect(response.body.clanChat).toBeNull();

      done();
    });
  });
});
