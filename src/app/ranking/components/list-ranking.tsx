import CustomRank from '@/app/components/ui/custom-rank'
import { formatNumber } from '@/helper/common'
import { IRankingItem } from '@/interfaces/i.user'
interface IListRankingItem {
  data: {
    currentRank: number
    ranking: Array<IRankingItem>
  }
  isEarn: boolean
}
export default function ListRankingItem({ data, isEarn }: IListRankingItem) {
  return <CustomRank data={data} isEarn={isEarn} type="ranking" />
}
