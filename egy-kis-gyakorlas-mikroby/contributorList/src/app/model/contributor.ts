export class Contributor {
  [key: string]: any

  login: string = ''
  id: number = 0
  avatar_url:string=''
  url:string=''
  html_url:string=''
  starred_url:string=''
  repos_url: string = ''
  events_url:string=''
  
  contributions: number = 0

}

// {
//   "login": "gkalpak",
//   "id": 8604205,
//   "node_id": "MDQ6VXNlcjg2MDQyMDU=",
//   "avatar_url": "https://avatars.githubusercontent.com/u/8604205?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/gkalpak",
//   "html_url": "https://github.com/gkalpak",
//   "followers_url": "https://api.github.com/users/gkalpak/followers",
//   "following_url": "https://api.github.com/users/gkalpak/following{/other_user}",
//   "gists_url": "https://api.github.com/users/gkalpak/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/gkalpak/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/gkalpak/subscriptions",
//   "organizations_url": "https://api.github.com/users/gkalpak/orgs",
//   "repos_url": "https://api.github.com/users/gkalpak/repos",
//   "events_url": "https://api.github.com/users/gkalpak/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/gkalpak/received_events",
//   "type": "User",
//   "site_admin": false,
//   "contributions": 1856
// }