<template>
    <div class="flex flex-col h-full ">
        <div class="flex flex-row justify-start gap-1 text-2xl font-semibold items-center h-[40px]  border-b-2 border-b-gray-300 mb-1 ">
            <div class="flex items-center cursor-pointer h-full px-4 mb-[-3px] text-center border-b-2 border-b-gray-600" >profile</div>
            <div class="flex items-center cursor-pointer h-full px-4 mb-[-3px] text-center border-b-2 border-b-gray-600">users</div>
        </div>
        <div class="flex-1 bg-red-600">
            <div class="flex items-center justify-between">
                <PrimaryButton :onclick="() => { showModal(null) }" icon="fas fa-plus">
                Добавить пользователя
                </PrimaryButton>
            </div>
        </div>
    </div>   
</template>

<script>

</script>
