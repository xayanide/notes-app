<script>
  export let data;
  export let form;
</script>

<svelte:head>
  <title>Change your password</title>
</svelte:head>

<h1>Change your password</h1>

{#if data.user}
  <form method="post">
    <div>
      <label for="oldpass">Current password</label><br />
      <input id="oldpass" type="password" name="oldPassword" required />
    </div>

    <div>
      <label for="newpass">New password</label><br />
      <input id="newpass" type="password" name="newPassword" required />
    </div>

    <button type="submit">Update password</button>
  </form>

  {#if form?.success}<p style="color:green">{form.success}</p>{/if}
  {#if form?.error}<p style="color:red">{form.error}</p>{/if}
{:else}
  <p>You are not signed in.</p>
{/if}
