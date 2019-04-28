<template>
  <div class="home">

    <div>
      <Card style="width:160px;display:inline-block;margin:20px;">
        <div style="text-align:center">
          <img style="width:100px" src="~@/assets/project.png">
          <h3>运营后台</h3>
        </div>
      </Card>

      <Card style="width:160px;display:inline-block;">
        <div style="text-align:center">
          <img style="width:100px" src="~@/assets/project.png">
          <h3>商户后台</h3>
        </div>
      </Card>

    </div>

    <div>
      分支名称
      <i-input v-model='branch'></i-input>
    </div>

    <i-button @click="runServer">确认</i-button>
    <i-button @click="update">更新</i-button>

  </div>

</template>
<script>
import path from "path";
import download from "../utils/download";
import command from "../utils/command.js";
import { OPERATION_FRONTEND_CONFIG } from "../config.js";

const git_branch = "git branch -a";
const npm_i = "npm i";
const node_server = "node server";

export default {
  data() {
    return {
      branch: "",
      options: {
        branches: []
      }
    };
  },
  methods: {
    handleSubmit(name) {},

    async createBranchFromRemote(branchName) {
      await command({
        cmdStr: `git fetch origin ${branchName}`,
        cmdPath: OPERATION_FRONTEND_CONFIG.path
      });

      await command({
        cmdStr: `git checkout -b ${branchName}`,
        cmdPath: OPERATION_FRONTEND_CONFIG.path
      });

      const res = await command({
        cmdStr: `git branch`,
        cmdPath: OPERATION_FRONTEND_CONFIG.path
      });
      console.log("当前分支是：", res);
    },

    async installNode() {
      const cmdPath = path.join(process.cwd(), "static");
      const res = await command({
        cmdStr: `node-v10.15.3-x64.msi`,
        cmdPath
      });
    },

    async hasNode() {
      let flag = true;
      const res = await command({
        cmdStr: `node -v`
      }).catch(err => {
        flag = false;
      });
      return flag;
    },

    open(link) {
      this.$electron.shell.openExternal(link);
    },

    async runServer() {
      if (!this.hasNode()) {
        this.installNode();
      } else {
        const git_clone =
          "git clone git@code.ipaynow.cn:operation_center/operation_frontend.git";

        await command({
          cmdStr: git_clone,
          cmdPath: OPERATION_FRONTEND_CONFIG.path
        });
        await this.createBranchFromRemote(this.branch);
        await command({ cmdStr: npm_i });
        await command({
          cmdStr: node_server,
          cmdPath: OPERATION_FRONTEND_CONFIG.path
        });
      }
    },

    getBranches() {
      return new Promise((resolve, reject) => {
        command({
          cmdStr: git_branch,
          cmdPath: OPERATION_FRONTEND_CONFIG.path
        }).then(res => {
          console.log("res 的值是：", res);
          resolve(res);
        });
      });
    },

    update() {}
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}
</style>

