export default {
  InterestRateFloatingTypeEnum: {
    /** 固定利率 */
    FIXED: "固定利率",
    /** 浮动利率 */
    FLOAT: "浮动利率",
  },
  ContractPeriodEnum: {
    LONG_TERM: "长期",
    MID_TERM: "中期",
    SHORT_TERM: "短期",
    TOTAL: "合计",
  },
  AuditStatus: {
    /** 待上报/默认 */
    DEFAULT: "待上报",
    /** 已上报 */
    SUBMITTED: "已上报",
    /** 已审批 */
    AUDITED: "已审批",
  },

  BankGroupEnum: {
    /** 非银团 */
    NOT_BANK_GROUP: "非银团",
    /** 主办行 */
    MAIN_BANK: "主办行",
    /** 参团行 */
    FOLLOW_BANK: "参团行",
  },
  IEType: {
    InterestCost: "付息",
    Repayment: "还款",
    Issuance: "放款",
    AdvisoryFee: "财务顾问费",
    InvestmentIncome: "理财收益",
    ExchangeLoss: "汇兑损失",
  },
  ContractCategory: {
    StandardContract: "标准合同",
    FrameworkContract: "框架合同",
    Subcontract: "子合同",
  },
  issuanceAmounts: "放款明细",
  repaymentAmounts: "还款明细",
  rigidRepaymentAmounts: "刚性还款明细",
  nonRigidRepaymentAmounts: "非刚性还款明细",
  interestCostAmounts: "付息明细",
};
