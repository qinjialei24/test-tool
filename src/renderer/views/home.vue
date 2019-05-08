<template>
  <div class="home">

    <Button type="primary" shape="circle" icon="ios-add" @click='visible.drawer=true'></Button>

    <div>
      <Card @click.native="choose(index)" :class="{'active':index===currentIndex}" v-for='(item,index) in options.project' :key="index" style="width:160px;display:inline-block;margin:20px;">
        <div style="text-align:center">
          <img style="width:100px" src="~@/assets/project.png">
          <h3>{{item.name}}</h3>
          <h3>{{item.branchName}} 分支</h3>
        </div>
      </Card>
    </div>

    <div style="margin:20px;">
      <i-button @click="runServer" type="primary">启动调试</i-button>
      <i-button @click="update" type="success">更新</i-button>
    </div>

    <Drawer width='400px' title="添加项目" placement="left" :closable="false" v-model="visible.drawer">
      <div>
        项目名称
        <i-input v-model='project.name' size='large' style="width:300px;"></i-input>
      </div>
      <div>
        git 地 址
        <i-input v-model='project.gitUrl' size='large' style="width:300px;"></i-input>
      </div>

      <div>
        分支名称
        <i-input v-model='project.branchName' size='large' style="width:300px;"></i-input>
      </div>

      <Button type="primary" icon="ios-add" @click='addProject'>确认添加</Button>

    </Drawer>

  </div>

</template>
<script>
import path from "path";
import download from "../utils/download";
import command from "../utils/command.js";
import { OPERATION_FRONTEND_CONFIG } from "../config.js";
import Validator from ".././utils/Validator.js";

const git_branch_a = "git branch -a";
const npm_i = "npm i";
const node_server = "node server";

export default {
  data() {
    return {
      currentIndex: 0,
      project: { name: "", gitUrl: "", branchName: "" },
      options: {
        branches: [],
        project: [
          {
            name: "运营后台",
            gitUrl:
              "git@code.ipaynow.cn:operation_center/operation_frontend.git",
            branchName: "master"
          },
          { name: "商户后台", gitUrl: "xxx", branchName: "master" }
        ]
      },
      visible: {
        drawer: false
      }
    };
  },
  methods: {
    choose(index) {
      console.log("index 的值是：", index);
      this.currentIndex = index;
    },

    addProject() {
      Validator.hint = message => {
        this.$Notice.error({
          title: message
        });
      };

      const v = new Validator([
        { fn: () => this.project.name !== "", message: "项目名称必填!" },
        { fn: () => this.project.gitUrl !== "", message: "gitUrl必填!" },
        { fn: () => this.project.branch !== "", message: "分支名称必填!" }
      ]);

      v.then(res => {
        const { name, gitUrl, branchName } = this.project;
        this.options.project.push({
          name,
          gitUrl,
          branchName
        });
        this.visible.drawer = false;
      });
    },

    handleSubmit(name) {},

    async createBranchFromRemote(branchName) {
      const res1 = await command({
        cmdStr: `git checkout -b ${branchName} origin/${branchName}`,
        cmdPath: OPERATION_FRONTEND_CONFIG.path
      }).catch(error => {
        console.log("error 的值是：", error);
      });

      const res2 = await command({
        cmdStr: `git branch`,
        cmdPath: OPERATION_FRONTEND_CONFIG.path
      });
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

    validate() {
      const conditions = [
        {
          fn: () => {
            //需要验证的函数，需要返回布尔值，返回 true 时 表示验证通过
            return this.options.branches.includes(this.branch);
          },
          message: "该分支不存在！"
        }
      ];
      this.validateConditions(conditions);
    },

    validateConditions(conditions = []) {
      const subs = [];

      return {
        then() {
          // subs.
        }
      };

      setTimeout(() => {
        for (const item of conditions) {
          const res = item.fn();
          if (!res) {
            this.$Notice.error({ title: item.message });
            return;
          }
        }
      }, 0);
    },

    async runServer() {
      const { gitUrl, branchName } = this.options.project[this.currentIndex];

      // const git_clone = `git clone ${gitUrl}`;
      // await command({
      //   cmdStr: git_clone
      // }).catch(error => {
      //   console.log("error 的值是：", error);
      // });
      // const res = await this.createBranchFromRemote(this.branch);

      const res6 = await command({
        cmdStr: "git clone git@code.ipaynow.cn:npaccount/aggplatWWW.git"
      }).catch(error => {
        console.log("error 的值是：", error);
      });

      // await command({ cmdStr: npm_i });
      // await command({
      //   cmdStr: node_server,
      //   cmdPath: OPERATION_FRONTEND_CONFIG.path
      // });
    },

    getBranches() {
      command({
        cmdStr: git_branch_a,
        cmdPath: OPERATION_FRONTEND_CONFIG.path
      }).then(res => {
        const arr = res
          .split(" ")
          .filter(item => item !== "")
          .map(item => {
            const i = item.indexOf("\n");
            return item.slice(0, i);
          });
        this.options.branches = arr;
      });
    },

    update() {},
    init() {
      !this.hasNode() &&
        this.$Modal.error({
          title:
            "检测到你当前没有 node 环境，无法启动调试服务，请点击下方按钮，安装 node,安装过程全部点下一步即可,安装完成后请手动重启。",
          okText: "安装 node",
          onOk: () => {
            this.installNode();
          },
          onCancel: () => {}
        });
      this.getBranches();
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  .active {
    border: 2px solid red;
  }
}
</style>

