import { getUserInfo, mining } from '@/services/user'
import useCommonStore from '@/stores/commonStore'
import { useQuery } from '@tanstack/react-query'

export const useUserInfo = () => {
  const { setUserInfo, token } = useCommonStore()
  return useQuery({
    queryKey: ['fetchUserInfo'],
    queryFn: async () => {
      mining()
      const res = await getUserInfo()
      if (res.status) {
        setUserInfo({ info: res.data })
      }
      return res.data
    },
    enabled: Boolean(token),
    retry: 3,
    retryDelay: 3000,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 30000
  })
}
