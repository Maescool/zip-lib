import * as zl from "../../lib";
import * as path from "path";
import * as assert from "assert";
import * as fs from "fs";

describe("zip", () => {
    it("zip with include", async () => {
        try {
            await zl.archiveFolder(path.join(__dirname, "../resources"), path.join(__dirname, "../zips/include.zip"), {
                include: [".*\.txt", ".*\.lnk"]
            });
            const unzipTarget = path.join(__dirname, "../unzips/include");
            await zl.extract(path.join(__dirname, "../zips/include.zip"), unzipTarget, {
                overwrite: true
            });
            fs.accessSync(path.join(unzipTarget, "¹ º » ¼ ½ ¾.txt"));
            fs.accessSync(path.join(unzipTarget, "src - shortcut.lnk"));
            fs.accessSync(path.join(unzipTarget, "subfolder/test.txt"));
            fs.accessSync(path.join(unzipTarget, "subfolder/test.txt - shortcut.lnk"));
            fs.accessSync(path.join(unzipTarget, "subfolder/test text.txt"));
            const exists = fs.existsSync(path.join(unzipTarget, "symlink"));
            if (exists) {
                assert.fail(`${path.join(unzipTarget, "symlink")} exists.`);
            }
            assert.ok(true, "zip with include");
        } catch (error) {
            assert.fail(error);
        }
    });
    it("zip with exclude", async () => {
        try {
            await zl.archiveFolder(path.join(__dirname, "../resources"), path.join(__dirname, "../zips/exclude.zip"), {
                exclude: [".*\.lnk"]
            });
            const unzipTarget = path.join(__dirname, "../unzips/exclude");
            await zl.extract(path.join(__dirname, "../zips/exclude.zip"), unzipTarget, {
                overwrite: true
            });
            fs.accessSync(path.join(unzipTarget, "¹ º » ¼ ½ ¾.txt"));
            fs.accessSync(path.join(unzipTarget, "subfolder/test.txt"));
            fs.accessSync(path.join(unzipTarget, "subfolder/test text.txt"));
            const exists1 = fs.existsSync(path.join(unzipTarget, "src - shortcut.lnk"));
            if (exists1) {
                assert.fail(`${path.join(unzipTarget, "src - shortcut.lnk")} exists.`);
            }
            const exists2 = fs.existsSync(path.join(unzipTarget, "subfolder/test.txt - shortcut.lnk"));
            if (exists2) {
                assert.fail(`${path.join(unzipTarget, "subfolder/test.txt - shortcut.lnk")} exists.`);
            }
            assert.ok(true, "zip with exclude");
        } catch (error) {
            assert.fail(error);
        }
    });
});