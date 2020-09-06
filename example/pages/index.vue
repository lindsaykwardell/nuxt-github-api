<template>
  <div>
    <div>
      <img
        :src="$github.user.avatarUrl"
        :alt="`Profile picture of ${$github.user.name}`"
      >
      <h2>{{ $github.user.name }}</h2>
      <h4>{{ $github.user.bio }}</h4>
      <p>{{ lookingForAJob }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lookingForAJob() {
      return this.$github.user.isHireable
        ? 'Looking for a great place to work!'
        : 'Not currently looking for a job'
    }
  }
}
</script>
