<template>
  <div class="home">
    <h2 id="ManagerLabel" for="ingredient">Delete ingredients</h2>
    <div id="flexManage">
      <div id="row">
        <h3 id="item">item 1</h3>

        <div id="circle">X</div>
      </div>

      <div id="row">
        <h3 id="item">item2</h3>

        <div id="circle">X</div>
      </div>
    </div>
  </div>
</template>
<script>
</script>

<style>
#flexManage {
  display: flex;
  flex-direction: column;
}
#row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 15px;
}

#item {
  margin-left: 15px;
}

#circle {
  display: flex;
  height: 50px;
  width: 50px;
  background-color: red;
  font-size: 45px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-right: 15px;
  cursor: pointer;
}
</style>
