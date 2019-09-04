package mx.gob.municipio.centro.model.gateways.sam;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayBeneficiario<lst_Beneficiarios> extends BaseGateway {
	
	private static Logger log = Logger.getLogger(GatewayBeneficiario.class.getName());
	
	private List<String> Beneficiarios;
	
	@Autowired
	public GatewayBitacora gatewayBitacora;
	
	public GatewayBeneficiario(){
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getBeneficiariosTodos(Integer tipo ){
		String sql="SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC";
		
	    return this.getJdbcTemplate().queryForList(sql);		
	}
	
	public Map<String, String> getBeneficiariosTodos2(Integer tipo) {
		String sql="";
		
		return (Map<String, String>) this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getListaBeneficiarios(){		
		  return this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");		
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, String> getBeneficiario(Long idBeneficiario) {
		
		if(idBeneficiario!=0)
			return this.getJdbcTemplate().queryForMap(" SELECT  A.CLV_BENEFI, A.AP_PATERNO, A.AP_MATERNO, A.ESTATUS ,A.NOMBRE, A.CLV_BNCSUC,A.NCOMERCIA,A.RACOMERCIAL,A.EMAIL, A.RFC, A.CURP, A.TIPOBENEFI, A.DOMIFISCAL, A.CIUDAD, A.ESTADO,  "+ 
					  " A.CODIGOPOST, A.TELEFONOS, A.COLONIA, A.NUM_CTA, A.TIPO_CTA, A.CLAVE_PADRE, A.ID_BENEFICIARIO, A.VIGENCIA, A.STATUS, A.CLABE,"+
	                  " CONVERT(varchar(10), A.FECHA_ALTA, 103) AS FECHA_ALTA, CONVERT(varchar(10), A.FECHA_BAJA, 103) AS FECHA_BAJA,CONVERT(varchar(10), A.FECHA_SAT, 103) AS FECHA_SAT, CONVERT(varchar(10), A.FECHA_MODIFICADA, 103) AS FECHA_MODIFICADA,"+
					  " A.PPMC, A.NUM_INTERIOR, A.NUM_EXTERIOR, A.LOCALIDAD, A.PTIPO,B.BANCO, B.SUCURSAL, B.PLAZA, (SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI=A.CLAVE_PADRE  ) BENEFICIARIO, A.ID_GIRO, A.ID_VIALIDAD "+
	                  " FROM        CAT_BENEFI AS A LEFT OUTER JOIN SAM_CAT_BNCSUC  B ON A.CLV_BNCSUC = B.CLV_BNCSUC WHERE  A.ID_BENEFICIARIO =  ?", new Object []{idBeneficiario});
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, String> getListaBeneficiarios5() {
		String sql="SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC";
		
		return (Map<String, String>) this.getJdbcTemplate().queryForList(sql);
		
	}
	
	public List<Map> getShortVendor(){		
		  return this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI as value, NCOMERCIA as label FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");		
	}
	
	public List<Map> getListadoBeneficiarios(String ncomercia,String rfc, int tipo, String vigencia){
		String clausula = "";
		
		if(ncomercia!="") clausula = " AND NCOMERCIA LIKE '%"+ncomercia+"%'";
		
				
		if(rfc!="") clausula +=" AND RFC LIKE '%"+rfc+"%'";
		
		if(vigencia.equals("0")) 
			clausula +=" AND STATUS IN(0,1) ";
		else if(vigencia.equals("1")) 
			clausula +=" AND STATUS IN(1) ";
		else if(vigencia.equals("0"))
			clausula +=" AND STATUS IN(0) ";
		if(tipo==1)
			clausula +=" AND TIPOBENEFI <>'MP' ";
		if(tipo==2)
			clausula +=" AND TIPOBENEFI ='MP' ";
		if(tipo==3)
			clausula +=" AND TIPOBENEFI <>'PF' ";
		if(tipo==4)
			clausula +=" AND TIPOBENEFI ='PM' ";
		if(tipo==5)
			clausula +=" AND TIPOBENEFI ='MP' ";
		
		String sql = "SELECT * FROM CAT_BENEFI WHERE NCOMERCIA <>'' "+clausula+" ORDER BY NCOMERCIA ASC";
	    return this.getJdbcTemplate().queryForList(sql);		
	}


	
	public  String    getBeneficiario2(Long idBeneficiario){
		if(idBeneficiario==0L) 
			return "";
		else
			return (String) this.getJdbcTemplate().queryForObject("SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI = ? ", new Object []{idBeneficiario},  String.class);
	}
	
	public  List   getBeneficiariosTodosHijos(String idBeneficiario){
		return this.getJdbcTemplate().queryForList("SELECT     A.CLV_BENEFI, A.CLV_BNCSUC, A.NCOMERCIA, A.BENEFICIAR, A.BENEFICIA2, A.RFC, A.CURP, A.TIPOBENEFI, A.DOMIFISCAL, A.CIUDAD, A.ESTADO, "+ 
					  " A.CODIGOPOST, A.TELEFONOS, A.COLONIA, A.NUM_CTA, A.TIPO_CTA, A.CLAVE_PADRE, A.BENEFI_07, A.ID_PROVEEDOR, A.VIGENCIA,A.CLABE  "+
                      " B.BANCO, B.SUCURSAL, B.PLAZA, "+
                      " (SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI=A.CLAVE_PADRE  ) BENEFICIARIO "+
                      " FROM        CAT_BENEFI AS A LEFT OUTER JOIN CAT_BNCSUC  B ON A.CLV_BNCSUC = B.CLV_BNCSUC WHERE  A.CLAVE_PADRE =  ? AND  A.STATUS =1",new Object []{idBeneficiario});
	}
	
	public  List   getBeneficiariosPorEjemplo(String razonSocial){
		return this.getJdbcTemplate().queryForList("SELECT     A.CLV_BENEFI, A.CLV_BNCSUC, A.NCOMERCIA, A.BENEFICIAR, A.BENEFICIA2, A.RFC, A.CURP, A.TIPOBENEFI, A.DOMIFISCAL, A.CIUDAD, A.ESTADO, "+ 
					  " A.CODIGOPOST, A.TELEFONOS, A.COLONIA, A.NUM_CTA, A.TIPO_CTA, A.CLAVE_PADRE, A.BENEFI_07, A.ID_PROVEEDOR, A.VIGENCIA,A.CLABE  "+
                      " B.BANCO, B.SUCURSAL, B.PLAZA, "+
                      " (SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI=A.CLAVE_PADRE  ) BENEFICIARIO "+
                      " FROM        CAT_BENEFI AS A LEFT OUTER JOIN  CAT_BNCSUC  B ON A.CLV_BNCSUC = B.CLV_BNCSUC WHERE  A.NCOMERCIA like  ? AND A.STATUS=1", new Object []{razonSocial+"%"});
	}
	
	public  Long   actualizarPrincipal(Long clave,String razonSocial,String razonComercial,String email,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,Integer status,String clabeb, Date fecha_alta, Date fecha_baja, String ap_paterno, String ap_materno, 
			String nombre, Date fecha_sat, Long ppmc, String num_interior,  String num_exterior, String localidad, String ptipo, Integer id_giro, Date fecha_modifica, Integer id_vialidad){
		 if (clave == 0) 		  
			  clave = inserta(razonSocial,razonComercial,email,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,status,clabeb,fecha_alta,fecha_baja, ap_materno, ap_paterno, nombre, fecha_sat, ppmc, num_interior,  num_exterior, localidad, ptipo, id_giro, fecha_modifica, id_vialidad);	  	  
		  else
			  actualizar(clave,razonSocial,razonComercial,email,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,status,clabeb,fecha_alta,fecha_baja, ap_materno, ap_paterno, nombre, fecha_sat, ppmc, num_interior,  num_exterior, localidad, ptipo, id_giro, fecha_modifica, id_vialidad);
		 return clave;
	}
	
	
	//AGREGAR UN NUEVO BENEFICIARIO--------------------------------------------------------------
	public Long inserta( String razonSocial,String razonComercial,String email,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,//12
			Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,Integer status, String clabeb, Date fecha_alta,Date fecha_baja, String ap_paterno, String ap_materno, //11
			String nombre, Date fecha_sat, Long ppmc, String num_interior,  String num_exterior, String localidad, String ptipo, Integer id_giro, Date fecha_modifica, Integer id_vialidad){//10
		try
		{
			Long cveBeneficiario =getNumeroBeneficiarioNuevo(tipo)+1;
			String folio=rellenarCeros(cveBeneficiario.toString(),4);	
			Long nPPMC = getNumeroPPMCNuevo(ptipo)+1;
			
			if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM CAT_BENEFI WHERE (RFC = ?)", new Object[]{rfc}) > 0)
			 
				throw new Exception("El Beneficiario ya se encuentran registrados en el sistema; actualizar la informacion.");
			
			//Long diasvigencia = (long) ((this.getJdbcTemplate().queryForInt("SELECT DATEDIFF (Day, ?, ?) As Dias FROM CAT_BENEFI WHERE (CLV_BENEFI=?)", new Object []{fecha_alta,new Date(),cveBeneficiario})));
			//System.out.println("Total de dias restantes" + diasvigencia);
			
											                           //razonSocial,razonComercial,email,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,
			         //idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,status,clabeb,fecha_alta,fecha_baja, ap_materno, ap_paterno, nombre, fecha_sat, ppmc, num_interior,  num_exterior, localidad, ptipo, id_giro, fecha_modifica, id_vialidad
			this.getJdbcTemplate().update("insert into cat_benefi (ID_BENEFICIARIO,  NCOMERCIA, RACOMERCIAL, EMAIL, RFC, CURP,TELEFONOS, TIPOBENEFI, DOMIFISCAL,COLONIA, CIUDAD, ESTADO, CODIGOPOST, "+//13
					" CLV_BNCSUC, NUM_CTA, TIPO_CTA, VIGENCIA, STATUS, CLABE, FECHA_ALTA, FECHA_BAJA, AP_PATERNO, AP_MATERNO, NOMBRE, FECHA_SAT,PPMC, NUM_INTERIOR, NUM_EXTERIOR, "//13
					+ "LOCALIDAD, PTIPO, ID_GIRO, FECHA_MODIFICADA, ID_VIALIDAD) " +
					"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
					, new Object[]{folio, razonSocial, razonComercial, email, rfc, curp, telefono, tipo, calle, colonia, ciudad, estado, cp, //13
							idBanco, noCuenta, tipoCuenta, vigencia,status, clabeb,fecha_alta,fecha_baja, ap_paterno, ap_materno, //10
							nombre, fecha_sat, nPPMC,num_interior,  num_exterior, localidad, ptipo,id_giro, fecha_modifica, id_vialidad});//10
			return cveBeneficiario;
		}
		catch(Exception e){
			throw new RuntimeException(e.getMessage(),e);
		}
	}
	
	private Long getDiasactivos( Date fecha_alta,Date fecha_baja,Long cveBeneficiario){
	
		String SQL="SELECT DATEDIFF (Day, "+fecha_alta+","+fecha_baja+") As Dias FROM CAT_BENEFI WHERE (CLV_BENEFI="+cveBeneficiario+")";
		return this.getJdbcTemplate().queryForLong(SQL);
	}
	
	private Long getNumeroBeneficiarioNuevo( String tipo){
		String SQL = "";
		if(tipo.equals("PM"))
			SQL = "SELECT MAX(ID_BENEFICIARIO) AS N FROM CAT_BENEFI WHERE ID_BENEFICIARIO >= 8000";
		else 
			SQL = "SELECT MAX(ID_BENEFICIARIO) AS N FROM CAT_BENEFI WHERE ID_BENEFICIARIO < 8000";
			

		return this.getJdbcTemplate().queryForLong(SQL);
	}
	
	private Long getNumeroPPMCNuevo( String tipo){
		String SQL = "";
		if(tipo.equals("ADQ"))
			SQL = "SELECT ISNULL(MAX(PPMC),0)CLAVE_PADRON FROM CAT_BENEFI WHERE PTIPO='ADQ'";
		else 
			SQL = "SELECT ISNULL(MAX(PPMC),0)CLAVE_PADRON FROM CAT_BENEFI WHERE PTIPO='CON'";
			

		return this.getJdbcTemplate().queryForLong(SQL);
	}
	
	public void actualizar(Long clave,String razonSocial,String razonComercial,String email,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,//13
			Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,Integer status, String clabeb,Date fecha_alta,Date fecha_baja, String ap_paterno, String ap_materno, //11
			String nombre, Date fecha_sat, Long ppmc, String num_interior,  String num_exterior, String localidad, String ptipo, Integer id_giro, Date fecha_modifica,Integer id_vialidad ){	//10
		this.getJdbcTemplate().update("UPDATE dbo.CAT_BENEFI SET NCOMERCIA= ?, RACOMERCIAL= ?, EMAIL= ?, RFC=?, CURP=?, TELEFONOS = ?, TIPOBENEFI = ?, DOMIFISCAL =?, COLONIA =?, CIUDAD = ?, ESTADO = ?, CODIGOPOST = ?,   " +//12
				  " CLV_BNCSUC= ?, NUM_CTA= ?, TIPO_CTA= ?,    CLAVE_PADRE= ?, vigencia= ?, STATUS= ?, CLABE= ?,FECHA_ALTA= ?,FECHA_BAJA = ? , AP_PATERNO= ?, AP_MATERNO= ?, "//11
				  + "NOMBRE= ?, FECHA_SAT= ?, PPMC= ?, NUM_INTERIOR= ?, NUM_EXTERIOR= ?, LOCALIDAD= ? , PTIPO= ?, ID_GIRO= ?, FECHA_MODIFICADA= ?, ID_VIALIDAD= ?" +//10
				  " WHERE ID_BENEFICIARIO= ?"  
				, new Object[]{razonSocial,razonComercial,email,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,//12
						idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,status,clabeb,fecha_alta,fecha_baja,ap_paterno, ap_materno, //11
						nombre, fecha_sat, ppmc, num_interior, num_exterior, localidad, ptipo, id_giro,fecha_modifica,id_vialidad, clave});//11
	}	
	
	public void eliminar(Long idBeneficiario ) {
		this.getJdbcTemplate().update("DELETE FROM CAT_BENEFI WHERE ID_PROVEEDOR=? ", new Object []{idBeneficiario});
	}
	
	public void deshabilitarBeneficiario(Long id){
		this.getJdbcTemplate().update("UPDATE CAT_BENEFI SET STATUS = ?,FECHA_BAJA=? WHERE ID_BENEFICIARIO = ?", new Object[]{0,new Date() ,id});
	}
	
	public void habilitarBeneficiario(Long id){
		this.getJdbcTemplate().update("UPDATE CAT_BENEFI SET STATUS = ?,FECHA_BAJA=? WHERE ID_BENEFICIARIO = ?", new Object[]{1,null,id});
	}

	
	

	
	public List<Map> simulaSearchResult(String ncomercia){
		
		List <Map> lst_Beneficiarios = getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");
		//List <Map> result = new ArrayList<Map>();
		
		//Iterar la lista y filtrar el beneficiario
		
		for (Map row: lst_Beneficiarios){
			
			if (((List<Map>) row.get("NCOMERCIA")).contains(ncomercia)){
				lst_Beneficiarios.add(row);
			}
		}
		System.out.println("Lista de Beneficiarios: " +lst_Beneficiarios);
		return lst_Beneficiarios;
		
	}

		
	public List<Map>DummyDB(String ncomercia){
		
		Beneficiarios = new ArrayList<String>();
		
		
		List <Map> lst_Beneficiarios = getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");
		
		String BeneficiariosTodos = lst_Beneficiarios.toString();
		StringTokenizer st = new StringTokenizer(BeneficiariosTodos, ",");
		
		//Parse the country CSV list and set as Array
        while(st.hasMoreTokens()) {
        	Beneficiarios.add(st.nextToken().trim());
        }
		
		for (Map row: lst_Beneficiarios){
			
			if (((List<Map>) row.get("NCOMERCIA")).contains(ncomercia)){
				lst_Beneficiarios.add(row);
			}
		}
		System.out.println("Lista de Beneficiarios: " +lst_Beneficiarios);
		return lst_Beneficiarios;
		
        
	}
		
	 public List<String> getBenefiList(String query) {
		
		 String Benefis = null;
	        query = query.toLowerCase();
	        List<String> lst_benefi = new ArrayList<String>();
	        
	        for(int i=0; i < Beneficiarios.size(); i++) {
	        	Benefis = Beneficiarios.get(i).toLowerCase();
	             if(Benefis.startsWith(query)) {
	            	 lst_benefi.add(Beneficiarios.get(i));
	             }
	        }
		return lst_benefi;
		 
	 }

	public Long rubrosBeneficiario(Long clv_benefi, String CLV_RUBRO) {
		
		try {
			
			//VALIDA QUE EL BENEFICIARIO NO TENGA MAS DE 5 RUBROS ACTIVOS
			if(this.getJdbcTemplate().queryForInt("SELECT COUNT(CLV_RUBRO) AS N FROM SAM_BENEFI_RUBRO WHERE CLV_BENEFI= ? AND STATUS = 1", new Object[]{clv_benefi}) >=5){
				throw new Exception("El Beneficiario ya se con el número máximo de rubros permitidos; actualizar la información.");
			}else
			{
				//VALIDAMOS QUE NO EXISTA EL RUBRO ASIGNADO AL BENEFICIARIO ACTUALMENTE EN ESTATUS ACTIVO
				if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM SAM_BENEFI_RUBRO WHERE CLV_BENEFI=? AND CLV_RUBRO=? AND STATUS = 1", new Object[]{clv_benefi,CLV_RUBRO}) > 0){
					throw new Exception("El Beneficiario ya cuenta con el rubro asignado; seleccione uno distinto.");
				}else{
					//ACTUALIZAMOS A ESTATUS ACTIVO EL RUBRO 
					String sql="INSERT INTO dbo.SAM_BENEFI_RUBRO(CLV_BENEFI, CLV_RUBRO, STATUS, FECHA_ALTA) VALUES(?, ?, ?, ?)";
					this.getJdbcTemplate().update(sql, new Object[]{clv_benefi, CLV_RUBRO, 1, new Date()});
				}
					
				return clv_benefi;
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(),e);
		}
		/*if (clv_benefi == 0) 		  
			clv_benefi = insertaRubro(clv_benefi,id_rubro);	  	  
		  else
			  actualizarRubro(clv_benefi,id_rubro);
		 return clv_benefi;*/
		
	}

	public List getTodosRubrosBeneficiario(Integer clv_benefi) {	   
		   return this.getJdbcTemplate().queryForList(" SELECT R.ID_RUBRO,R.CLV_RUBRO,R.DESCRIPCION,R.STATUS FROM SAM_BENEFI_RUBRO BR " +
				   									  " INNER JOIN SAM_CAT_RUBROS R ON R.CLV_RUBRO=BR.CLV_RUBRO " +
				   									  " where CLV_BENEFI= ? ", new Object[]{clv_benefi});
	}
	private void actualizarRubro(Long clv_benefi, int id_rubro) {
		
		if(this.getJdbcTemplate().queryForInt("SELECT COUNT(ID_RUBRO) AS N FROM SAM_BENEFI_RUBRO WHERE CLV_BENEFI= ? AND STATUS = 1", new Object[]{clv_benefi}) >=5){
			
		}
	}

	private Long insertaRubro(Long clv_benefi, String clv_rubro){
		
		try {
			
			//VALIDA QUE EL BENEFICIARIO NO TENGA MAS DE 5 RUBROS ACTIVOS
			if(this.getJdbcTemplate().queryForInt("SELECT COUNT(ID_RUBRO) AS N FROM SAM_BENEFI_RUBRO WHERE CLV_BENEFI= ? AND STATUS = 1", new Object[]{clv_benefi}) >=5){
				throw new Exception("El Beneficiario ya se con el número máximo de rubros permitidos; actualizar la información.");
			}else
			{
				//VALIDAMOS QUE NO EXISTA EL RUBRO ASIGNADO AL BENEFICIARIO ACTUALMENTE EN ESTATUS ACTIVO
				if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM SAM_BENEFI_RUBRO WHERE CLV_BENEFI=? AND ID_RUBRO=? AND STATUS = 1", new Object[]{clv_benefi,clv_rubro}) > 0){
					throw new Exception("El Beneficiario ya se con el rubro; actualizar la información.");
				}else{
					//ACTUALIZAMOS A ESTATUS ACTIVO EL RUBRO 
					String sql="INSERT INTO dbo.SAM_BENEFI_RUBRO(CLV_BENEFI,ID_RUBRO,STATUS,FECHA_ALTA) VALUES(?, ?, ?, ?)";
					this.getJdbcTemplate().update("sql", new Object[]{clv_benefi,clv_rubro,1,new Date()});
				}
					
				return clv_benefi;
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(),e);
		}
	}

	public Long actualizarRubro(Long clv_rubro,String rubro, Boolean status, Date formatoFecha, Date formatoFecha2) {
		try {
			
			//VALIDA QUE EL BENEFICIARIO NO TENGA MAS DE 5 RUBROS ACTIVOS
			if(this.getJdbcTemplate().queryForInt("SELECT COUNT(ID_RUBRO) AS N FROM SAM_CAT_RUBROS WHERE ID_RUBRO= ? ", new Object[]{clv_rubro}) > 0){
				throw new Exception("El Rubro ya se se encuentra dado de alta.");
			}else
			{
				//ACTUALIZAMOS A ESTATUS ACTIVO EL RUBRO 
				String sql="INSERT INTO dbo.SAM_CAT_RUBROS(CLV_RUBRO, RUBRO, STATUS, FECHA_ALTA) VALUES(?, ?, ?, ?)";
				this.getJdbcTemplate().update("sql", new Object[]{clv_rubro, rubro, 1, new Date()});
					
				return clv_rubro;
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(),e);
		}
	}

	public void eliminaRubros(Long clv_benefi, String clv_rubro, int ejercicio, int idUsuario) {
		try{
			log.info("Elimiando rubro del beneficiario "+ clv_benefi + "el rubro : " + clv_rubro);
			this.getJdbcTemplate().update("DELETE FROM SAM_BENEFI_RUBRO where CLV_BENEFI= ? AND CLV_RUBRO=? ", new Object[]{clv_benefi, clv_rubro});
			//guarda en la bitacora
			//gatewayBitacora.guardarBitacora(gatewayBitacora.OP_MOV_ELIMINA_RETENCION, ejercicio, cve_pers, idOrden, folio, "OP", null, null, null, "Cons: "+idRetencion, 0D);
		}
		catch ( DataAccessException e) {
			log.info(e.getMessage());
		}
		
	}

	public void insertaDocumento(int parseInt, String tipoMovDoc, String numeroDoc, String notaDoc, Long clv_benefi,
			int ejercicio, int idUsuario) {
		// TODO Auto-generated method stub
		
	}

	public void actualizarDocumento(int parseInt, String tipoMovDoc, String numeroDoc, String notaDoc, Long clv_benefi,
			int ejercicio, int idUsuario) {
		// TODO Auto-generated method stub
		
	}
}
