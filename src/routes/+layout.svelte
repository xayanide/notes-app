<script lang="ts">
  import "./layout.css";
  export let data;
</script>

<header>
  <nav>
    <a href="/">Home</a>
    {#if data.user}
      <a href="/notes">Notes</a>
      <a href="/change-password">Change Password</a>
      <a href="/sign-out">Sign-out</a>
    {:else}
      <a href="/sign-in">Sign-in</a>
      <a href="/sign-up">Sign-up</a>
    {/if}
  </nav>
</header>

<main>
  <slot />
</main>
