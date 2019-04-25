<template>
  <div class="home">

    <div>
      <i-card style="width:160px;display:inline-block;margin:20px;">
        <div style="text-align:center">
          <img style="width:100px" src="~@/assets/project.png">
          <h3>运营后台</h3>
        </div>
      </i-card>

      <i-card style="width:160px;display:inline-block;">
        <div style="text-align:center">
          <img style="width:100px" src="~@/assets/project.png">
          <h3>商户后台</h3>
        </div>
      </i-card>

    </div>

    <div>
      分支列表
      <i-select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </i-select>
    </div>

  </div>

</template>
<script>
import download from "../utils/download";
import command from "../utils/command.js";
console.log("command 的值是：", command);

export default {
  data() {
    return {
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        }
      ],
    };
  },
  methods: {
    handleSubmit(name) {},
    onDownload() {
      command(
        "git clone git@code.ipaynow.cn:operation_center/operation_frontend.git"
      );

      setTimeout(() => {}, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}
</style>

