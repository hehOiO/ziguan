  <template>
  <div class="Etable">
    <el-table :data="data" style="width: 100%,height:100%" max-height="400">
      <el-table-column
        align="left"
        v-for="(item,index) in columns"
        :key="index"
        :prop="item.key"
        :label="item.title"
        :min-width="item.width"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <div v-if="item.render">
            <render :render="item.render" :params="scope" />
          </div>
          <span v-else>{{scope.row | itemFilter(item)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
import render from "@/common/render.js";
export default {
  name: "Etable",
  props: {
    columns: {
      type: Array,
      default: true
    },
    data: {
      type: Array,
      default: true
    },
  },
  data() {
    return {};
  },
  mounted() {},
  components: { render },
  filters: {
    itemFilter(value, column) {
      if (column.filter) {
        return column.filter(value[column.key]);
      }
      return value[column.key];
    }
  }
};
</script>
<style lang="less">
.Etable {
  .el-table__body-wrapper {
    background-color: black;
  }
  .el-table th {
    background-color: #393939;
  }
  .el-table tr {
    background-color: black;
    color: #fff;
  }
  .el-table thead tr {
    color: #888;
  }
  .el-table td,
  .el-table th {
    padding: 3px 0;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: black;
  }
  .el-table::before {
    background-color: transparent;
  }
  .el-table__fixed-right-patch {
    background-color: #393939;
    border-bottom: 1px solid #393939;
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    background-color: #000000;
  }
  // 改变左侧表格 高亮颜色
  .el-table__body .el-table__row.hover-row td {
    background-color: #393939 !important;
  }
  // 改变查看明细 高亮颜色
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #393939 !important;
  }
}
</style>