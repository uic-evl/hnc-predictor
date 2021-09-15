stage_maker<-function(DATA){
     
DATA$stage_new="fill"

ind_OPpos=(DATA$site == "OPC" & DATA$HPV.P16.status=="Positive")
DATA_temp=DATA[ind_OPpos,]

DATA_temp$stage_new[DATA_temp$T_stage %in% c("T0","T1","T2","Tx") & DATA_temp$N_stage %in% c("N0","N1","N2a-b")]      ="I"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T0","T1","T2","Tx") & DATA_temp$N_stage %in% c("N2c")]                  ="II"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T3")                & DATA_temp$N_stage %in% c("N0","N1","N2a-b","N2c")]="II"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T4")                | DATA_temp$N_stage %in% c("N3")]                   ="III"

DATA_temp[DATA_temp$stage_new=="fill",c("T_stage","N_stage")]
DATA$stage_new[ind_OPpos]=DATA_temp$stage_new


ind_OPneg=(DATA$site == "OPC" & DATA$HPV.P16.status=="Negative")|DATA$site %in% c("Oral Cavity","Hypopharynx","Larynx")
DATA_temp=DATA[ind_OPneg,]

DATA_temp$stage_new[DATA_temp$T_stage %in% c("T0","Tx","T1")      & DATA_temp$N_stage %in% c("N0")]            ="I"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T2")                & DATA_temp$N_stage %in% c("N0")]            ="II"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T1","T2","Tx")      & DATA_temp$N_stage %in% c("N1")]            ="III"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T3")                & DATA_temp$N_stage %in% c("N0","N1")]       ="III"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T4")                | DATA_temp$N_stage %in% c("N2a-b","N2c")]   ="IVa"
DATA_temp$stage_new[                                                DATA_temp$N_stage %in% c("N3")]            ="IVb"

DATA_temp[DATA_temp$stage_new=="fill",c("T_stage","N_stage")]
DATA$stage_new[ind_OPneg]=DATA_temp$stage_new


ind_NASO=(DATA$site == "Nasopharynx" )
DATA_temp=DATA[ind_NASO,]

DATA_temp$stage_new[DATA_temp$T_stage %in% c("T0","Tx","T1")      & DATA_temp$N_stage %in% c("N0")]            ="I"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T0","Tx","T1")      & DATA_temp$N_stage %in% c("N1")]            ="II"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T2")                & DATA_temp$N_stage %in% c("N0","N1")]       ="II"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T0","Tx","T1")      & DATA_temp$N_stage %in% c("N2a-b","N2c")]   ="III"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T2","T3")           & DATA_temp$N_stage %in% c("N2a-b","N2c")]   ="III"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T3")                & DATA_temp$N_stage %in% c("N0","N1")]       ="III"
DATA_temp$stage_new[DATA_temp$T_stage %in% c("T4")                | DATA_temp$N_stage %in% c("N3")]            ="IVa"


DATA_temp[DATA_temp$stage_new=="fill",c("T_stage","N_stage")]
DATA$stage_new[ind_NASO]=DATA_temp$stage_new


ind_Unk=(DATA$site == "Unkown_primary" )
DATA_temp=DATA[ind_Unk,]

DATA_temp$stage_new[DATA_temp$N_stage %in% c("N1","N2a-b")]            ="III"
DATA_temp$stage_new[DATA_temp$N_stage %in% c("N2c")]            ="IVa"
DATA_temp$stage_new[DATA_temp$N_stage %in% c("N3")]            ="IVb"


DATA_temp[DATA_temp$stage_new=="fill",c("T_stage","N_stage")]
DATA$stage_new[ind_Unk]=DATA_temp$stage_new

DATA$stage_new=factor(DATA$stage_new,levels=c('I','II','II','III','IVa','IVb'),
                                     labels=c('I','II','II','III','IVa','IVb'))  


DATA$stage_new_7th=DATA$stage_new
ind_OPpos=(DATA$site == "OPC" )
DATA_temp=DATA[ind_OPpos,]
DATA_temp$stage_new_7th[DATA_temp$T_stage %in% c("T0","Tx","T1")      & DATA_temp$N_stage %in% c("N0")]            ="I"
DATA_temp$stage_new_7th[DATA_temp$T_stage %in% c("T2")                & DATA_temp$N_stage %in% c("N0")]            ="II"
DATA_temp$stage_new_7th[DATA_temp$T_stage %in% c("T1","T2")           & DATA_temp$N_stage %in% c("N1")]            ="III"
DATA_temp$stage_new_7th[DATA_temp$T_stage %in% c("T3")                & DATA_temp$N_stage %in% c("N0","N1")]       ="III"
DATA_temp$stage_new_7th[DATA_temp$T_stage %in% c("T4")                | DATA_temp$N_stage %in% c("N2a-b","N2c")]   ="IVa"
DATA_temp$stage_new_7th[                                                DATA_temp$N_stage %in% c("N3")]            ="IVb"

DATA_temp[DATA_temp$stage_new_7th=="fill",c("T_stage","N_stage")]
DATA$stage_new_7th[ind_OPpos]=DATA_temp$stage_new_7th

# DATA[DATA$stage_new=="fill",c("site","T_stage","N_stage")]

return(DATA)


}