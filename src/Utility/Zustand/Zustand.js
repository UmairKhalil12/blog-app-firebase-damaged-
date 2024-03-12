import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  userInfo: null,
  blogs: [],
  tags : [],
  setUser: (value) => set(({ user: value })),
  setUserInfo: (value) => set(({ userInfo: value })),
  setBlogs: (value) => set(({ blogs: value })),
  setTags : (value) => set(({tags : value}))
}));


export default useStore