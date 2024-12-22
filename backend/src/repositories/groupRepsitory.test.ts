import fs from "fs";
import { GroupRepository } from "./groupRepository";
import { Group } from "../type";

jest.mock("fs");

describe("GroupRepository", () => {
  const mockFs = jest.mocked(fs);
  let repo: GroupRepository;

  beforeEach(() => {
    mockFs.existsSync.mockClear();
    mockFs.readFileSync.mockClear();
    mockFs.writeFileSync.mockClear();
    repo = new GroupRepository("goups.json");
  });

  describe("loadGroupos", () => {
    it("グループ一覧が取得できる", () => {
      const groups: Group[] = [
        {
          name: "group1",
          members: ["一郎", "二郎"],
        },
        {
          name: "group2",
          members: ["太郎", "花子"],
        },
      ];
      const moskData = JSON.stringify(groups);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(moskData);
      const result = repo.loadGroups();
      expect(result).toEqual(groups);
    });
  });
});
