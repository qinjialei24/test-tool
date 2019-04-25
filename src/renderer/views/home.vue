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
      分支列表
      <i-select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </i-select>
    </div>

    <i-button @click="runServer">确认</i-button>

  </div>

</template>
<script>
import path from "path";
import download from "../utils/download";
import command from "../utils/command.js";
console.log("command 的值是：", command);

export default {
  data() {
    return {
      model1: "",
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        }
      ]
    };
  },
  methods: {
    handleSubmit(name) {},

    async runServer() {
      const p = path.join(process.cwd(), "operation_frontend");

      const git_clone =
        "git clone git@code.ipaynow.cn:operation_center/operation_frontend.git";
      const git_branch = "git branch -a";
      const npm_i = "npm i";
      const node_server = "node server";

      await command({ cmdStr: git_clone });
      await command({ cmdStr: git_branch, cmdPath: p });
      await command({ cmdStr: npm_i });
      await command({ cmdStr: node_server, cmdPath: p });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}
</style>

