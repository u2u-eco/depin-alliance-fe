import CustomRank from '@/app/components/ui/custom-rank'
import { formatNumber } from '@/helper/common'
import { IRankingItem } from '@/interfaces/i.user'
interface IListRankingItem {
  data: {
    currentRank: number
    ranking: Array<IRankingItem>
  }
  isEarn: boolean
  tab?: string
}
export default function ListRankingItem({ data, isEarn, tab }: IListRankingItem) {
  return <CustomRank data={data} isEarn={isEarn} tab={tab} type="ranking" />
}
