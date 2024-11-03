export const isChildRoute = (childRoute: string, parentRoute: string) => {
  // 确保两个路由都以斜杠开头
  if (!childRoute.startsWith("/") || !parentRoute.startsWith("/")) {
    return false;
  }

  // 去掉开头的斜杠
  const trimmedChild = childRoute.slice(1);
  const trimmedParent = parentRoute.slice(1);

  // 检查子路由是否以父路由开头
  const isSub = trimmedChild.startsWith(trimmedParent);

  // 如果父路由和子路由相同，返回 true；如果子路由在父路由后面有其他路径，返回 true
  return (
    isSub &&
    (trimmedChild === trimmedParent ||
      trimmedChild[trimmedParent.length] === "/")
  );
};
