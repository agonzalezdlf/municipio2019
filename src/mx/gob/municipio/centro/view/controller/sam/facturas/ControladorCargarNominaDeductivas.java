package mx.gob.municipio.centro.view.controller.sam.facturas;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.gateways.sam.GatewayFacturas;
import mx.gob.municipio.centro.view.bases.ControladorBase;
import mx.gob.municipio.centro.view.controller.sam.facturas.ListaNomina;
import mx.gob.municipio.centro.view.controller.sam.ordenesPagos.ControladorBeneficiario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

@Controller
@RequestMapping("/sam/facturas/lst_CargarNomina.action")
public class ControladorCargarNominaDeductivas extends ControladorBase {

	private static Logger log = 
	        Logger.getLogger(ControladorCargarNominaDeductivas.class.getName());
	
	@Autowired
	GatewayFacturas gatewayFacturas;
	
	public ControladorCargarNominaDeductivas(){}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public String requestGetControlador(Map modelo, HttpServletRequest request, HttpServletResponse response, @RequestParam(value="recarga",required=false) String recarga) throws IOException{
		//, @RequestParam("recarga") String recarga
		Gson gson = new Gson();
	    Map m = new HashMap();
	    
	    String json = "";
		//String recarga =request.getParameter("recarga");
		
		if (recarga == null ){
			//
			 m.put("mensaje", true);
	         json = gson.toJson(m);
	         modelo.put("mensaje", json);
			 System.out.println("Sin parametros");
			
		}else{
			
			System.out.println("Si trae parametros: " +recarga);
			m.put("mensaje", false);
	        json = gson.toJson(m);
	        modelo.put("mensaje", json);
	        cargarInformacion(modelo);
		}
		
		return "sam/facturas/lst_CargarNomina.jsp";
	}
	
	/*@RequestMapping(value = "sam/facturas/lst_CargarNomina/profile", method = RequestMethod.GET)
	public @ResponseBody String processAJAXRequest(
	            @RequestParam("firstname") String firstname,
	            @RequestParam("lastname") String lastname   ) {
	        String response = "";
	        // Process the request
	        // Prepare the response string
	        return response;
	    }
	*/
	public void cargarInformacion(Map modelo){
		long startTime = System.nanoTime();

		List<Map> nomina = this.getJdbcTemplate().queryForList("SELECT N.ID_PROYECTO,N.CLV_PARTID,N.ID_RECURSO,N.ID_DEPENDENCIA,N.TIPO_NOMINA,N.NUM_QUINCENA,N.MES,CONVERT(varchar(10), N.FECHA_NOMINA, 103) AS FECHA_NOMINA,N.IMPORTE,N.NOTA, VP.CLV_UNIADM FROM SAM_NOMINA AS N INNER JOIN VPROYECTO AS VP ON (VP.ID_PROYECTO = N.ID_PROYECTO)");
		modelo.put("listadoNomina", nomina);
		
		List<Map> deduccicones = this.getJdbcTemplate().queryForList("SELECT D.*, CR.RETENCION FROM SAM_NOMINA_DEDUCCIONES AS D LEFT JOIN CAT_RETENC AS CR ON (CR.CLV_RETENC = D.CLV_RETENC)");
		modelo.put("listadodeducciones", deduccicones);
		
		List<ListaNomina> lista = new ArrayList<ListaNomina>();
		List<Map> validacionNomina = this.getJdbcTemplate().queryForList("SELECT  N.TIPO_NOMINA, "+
																					"VP.ID_RECURSO, "+
																					"VP.CLV_UNIADM, "+
																					"VP.UNIDADADM, "+
																					"N.ID_PROYECTO,  "+
																					"VP.N_PROGRAMA,  "+
																					"VP.ACT_INST, "+ 
																					"N.CLV_PARTID, "+
																					"CP.PARTIDA, "+
																					"SUM(N.IMPORTE) AS IMPORTE, "+
																					"dbo.getDisponible(N.MES, N.ID_PROYECTO, N.CLV_PARTID) AS DISPONIBLE_MES, "+
																					"dbo.getDisponibleAlPeriodo(1,12, N.ID_PROYECTO, N.CLV_PARTID) AS DISPONIBLE_ANIO, 0 AS TOTAL "+
																			"FROM SAM_NOMINA AS N  "+
																					"INNER JOIN VPROYECTO AS VP ON (VP.ID_PROYECTO = N.ID_PROYECTO)  "+
																					"INNER JOIN CAT_PARTID AS CP ON (CP.CLV_PARTID = N.CLV_PARTID) "+ 
																			"GROUP BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.CLV_UNIADM, VP.UNIDADADM, N.ID_PROYECTO, VP.N_PROGRAMA, VP.ACT_INST, N.CLV_PARTID, CP.PARTIDA, N.MES  "+
																			"ORDER BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.UNIDADADM, VP.CLV_UNIADM ASC");
		//Realizar aqui el proceso para recuperar el proyecto y partida
		for(Map row: validacionNomina)
		{	
			if(lista.indexOf(new ListaNomina((Integer) row.get("ID_PROYECTO"), row.get("CLV_PARTID").toString(), (BigDecimal) row.get("DISPONIBLE_MES"), (BigDecimal) row.get("DISPONIBLE_ANIO")))==-1)
			{
				lista.add(new ListaNomina((Integer)row.get("ID_PROYECTO"), row.get("CLV_PARTID").toString(), (BigDecimal) row.get("DISPONIBLE_MES"), (BigDecimal) row.get("DISPONIBLE_ANIO")));
			}
		}
		
		//Realizar el proceso para restar los montos
		for(Map row: validacionNomina)
		{
			for(ListaNomina reg : lista)
			{
				if(reg.ID_PROYECTO == Integer.parseInt(row.get("ID_PROYECTO").toString()) && reg.CLV_PARTID.equals(row.get("CLV_PARTID").toString()))
				{
					BigDecimal importe = (BigDecimal) row.get("IMPORTE");
					BigDecimal disponibleMES = reg.IMPORTE_MES.subtract(importe);
					//BigDecimal disponibleANIO = reg.IMPORTE_ANIO.subtract(importe);
					row.put("DISPONIBLE_MES", reg.IMPORTE_MES);
					reg.IMPORTE_MES = disponibleMES;
					row.put("TOTAL", disponibleMES);
				}
			}
			
		}
		long endTime = System.nanoTime();
		long timer = endTime-startTime;
		System.out.println("tiempo que recorrio: " +timer);
		modelo.put("timer", timer);
		modelo.put("listavalidacionNomina", validacionNomina);
	}
	public void borrarDatosNomina(){
		gatewayFacturas.borrarDatosNomina();
	}
	
	public void crearFacturaOrdenPago(){
		
		String sql="SELECT count (*) FROM SAM_NOMINA";
			
		int cdatos = (int) getJdbcTemplate().queryForObject(sql, new Object[]{}, Integer.class);
		            	
		if (cdatos>0){
			throw new RuntimeException("No existe informacion para generar documentos");
		}
		//Modulo que genera devengado por nomina agrupando para generar solo un devengado en maestro
		gatewayFacturas.CreatePayRollSAM(this.getSesion().getIdUsuario(), this.getSesion().getEjercicio(), Integer.parseInt(this.getSesion().getIdUnidad()), getSesion().getIdGrupo());
		
		//Modulo anterior que generaba devengado por movimiento de la nomina obteniendo muchas nominas en el maestro
		//gatewayFacturas.crearFacturaOrdenPago(this.getSesion().getIdUsuario(), this.getSesion().getEjercicio(), Integer.parseInt(this.getSesion().getIdUnidad()), getSesion().getIdGrupo());
	}
}
