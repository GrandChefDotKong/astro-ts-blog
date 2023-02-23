export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturPosts = true,
  sortByDate = true,
  limit = undefined,

} = {}) {

  const filterPosts = posts.reduce((acc, post) => {
    const { date, draft, status } = post.frontmatter;

    if(filterOutDrafts && draft) {
      return acc;
    }

    if(filterOutFuturPosts && new Date(date) > new Date) {
      return acc;
    }

    acc.push(post);
    
    return acc;
  }, [])

  if(sortByDate) {
    filterPosts.sort((a, b) => 
      new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filterPosts.sort(() => Math.random() - 0.5) // randomize
  }

  if(typeof(limit) === "number") {
    return filterPosts.slice(0, limit);
  }

  return filterPosts

}
